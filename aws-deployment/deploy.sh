#!/bin/bash

# PetroVue AWS Deployment Script
# Deploys the application to AWS using CloudFormation and S3

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
REGION=${AWS_REGION:-eu-north-1}
STACK_NAME="petrovue-${ENVIRONMENT}"

echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   PetroVue AWS Deployment Script                 ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed.${NC}"
    echo "Please install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS credentials not configured.${NC}"
    echo "Please run: aws configure"
    exit 1
fi

echo -e "${YELLOW}Environment:${NC} $ENVIRONMENT"
echo -e "${YELLOW}Region:${NC} $REGION"
echo -e "${YELLOW}Stack Name:${NC} $STACK_NAME"
echo ""

# Step 1: Build the application
echo -e "${GREEN}[1/5] Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

# Step 2: Deploy CloudFormation stack
echo -e "${GREEN}[2/5] Deploying CloudFormation stack...${NC}"
aws cloudformation deploy \
    --template-file aws-deployment/cloudformation.yml \
    --stack-name $STACK_NAME \
    --parameter-overrides EnvironmentName=$ENVIRONMENT \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --no-fail-on-empty-changeset

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ CloudFormation stack deployed${NC}"
else
    echo -e "${RED}✗ CloudFormation deployment failed${NC}"
    exit 1
fi
echo ""

# Step 3: Get S3 bucket name from CloudFormation outputs
echo -e "${GREEN}[3/5] Getting deployment configuration...${NC}"
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='WebsiteBucketName'].OutputValue" \
    --output text \
    --region $REGION)

CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
    --output text \
    --region $REGION)

if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}Error: Could not retrieve S3 bucket name${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Configuration retrieved${NC}"
echo -e "${YELLOW}  Bucket:${NC} $BUCKET_NAME"
echo -e "${YELLOW}  CloudFront:${NC} $CLOUDFRONT_ID"
echo ""

# Step 4: Upload build files to S3
echo -e "${GREEN}[4/5] Uploading files to S3...${NC}"
aws s3 sync build/ s3://$BUCKET_NAME/ \
    --delete \
    --region $REGION \
    --cache-control "max-age=31536000" \
    --exclude "*.html" \
    --exclude "service-worker.js"

# Upload HTML files with shorter cache
aws s3 sync build/ s3://$BUCKET_NAME/ \
    --exclude "*" \
    --include "*.html" \
    --include "service-worker.js" \
    --region $REGION \
    --cache-control "max-age=0,no-cache,no-store,must-revalidate"

echo -e "${GREEN}✓ Files uploaded to S3${NC}"
echo ""

# Step 5: Invalidate CloudFront cache
echo -e "${GREEN}[5/5] Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo -e "${GREEN}✓ CloudFront cache invalidated${NC}"
echo -e "${YELLOW}  Invalidation ID:${NC} $INVALIDATION_ID"
echo ""

# Get CloudFront URL
CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
    --output text \
    --region $REGION)

echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment Complete!                            ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Your application is now live at:${NC}"
echo -e "${YELLOW}https://${CLOUDFRONT_URL}${NC}"
echo ""
echo -e "${GREEN}Deployment Summary:${NC}"
echo -e "  Environment: $ENVIRONMENT"
echo -e "  Region: $REGION"
echo -e "  S3 Bucket: $BUCKET_NAME"
echo -e "  CloudFront ID: $CLOUDFRONT_ID"
echo ""
echo -e "${YELLOW}Note: CloudFront invalidation may take 10-15 minutes to complete.${NC}"
echo ""

