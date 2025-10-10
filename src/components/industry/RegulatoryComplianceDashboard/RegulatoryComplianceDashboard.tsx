/**
 * Regulatory Compliance Dashboard for Norwegian Petroleum Directorate
 * Demonstrates understanding of Norwegian regulatory framework
 */

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Alert,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle,
  Warning,
  Error,
  Schedule,
  Assignment,
  Security,
  Nature,
  Engineering
} from '@mui/icons-material';
import { norwegianTranslations } from '../../../constants/norwegianLocalization';

// Styled components for regulatory sections
const ComplianceCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
  color: 'white',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
  }
}));

const RegulationCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  color: 'white',
}));

const AuditCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)',
  color: 'white',
}));

// Interfaces for compliance data
interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  authority: 'NPD' | 'PSA' | 'NEA' | 'NOA'; // Norwegian authorities
  category: 'safety' | 'environmental' | 'operational' | 'reporting';
  status: 'compliant' | 'non-compliant' | 'pending' | 'overdue';
  dueDate: Date;
  lastReview: Date;
  nextReview: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  documentStatus: 'approved' | 'pending' | 'rejected' | 'draft';
}

interface RegulatoryFramework {
  name: string;
  authority: string;
  description: string;
  applicableToOil: boolean;
  applicableToGas: boolean;
  lastUpdate: Date;
  nextRevision: Date;
  complianceLevel: number;
}

// Mock data for Norwegian regulatory compliance
const mockComplianceData: ComplianceRequirement[] = [
  {
    id: 'NPD-001',
    title: 'Månedlig produksjonsrapport',
    description: 'Rapportering av produksjonsdata til Oljedirektoratet',
    authority: 'NPD',
    category: 'reporting',
    status: 'compliant',
    dueDate: new Date('2024-02-01'),
    lastReview: new Date('2024-01-15'),
    nextReview: new Date('2024-02-01'),
    riskLevel: 'medium',
    documentStatus: 'approved'
  },
  {
    id: 'PSA-002',
    title: 'Sikkerhetsdokumentasjon (Safety Case)',
    description: 'Oppdatering av sikkerhetsdokumentasjon for Petroleumstilsynet',
    authority: 'PSA',
    category: 'safety',
    status: 'pending',
    dueDate: new Date('2024-03-15'),
    lastReview: new Date('2023-12-01'),
    nextReview: new Date('2024-03-15'),
    riskLevel: 'high',
    documentStatus: 'pending'
  },
  {
    id: 'NEA-003',
    title: 'Miljøkonsekvensutredning',
    description: 'Miljøpåvirkningsrapport til Miljødirektoratet',
    authority: 'NEA',
    category: 'environmental',
    status: 'overdue',
    dueDate: new Date('2024-01-10'),
    lastReview: new Date('2023-11-15'),
    nextReview: new Date('2024-02-10'),
    riskLevel: 'critical',
    documentStatus: 'draft'
  },
  {
    id: 'NPD-004',
    title: 'Reserverapportering',
    description: 'Oppdatering av reserveestimater og ressursklassifisering',
    authority: 'NPD',
    category: 'operational',
    status: 'compliant',
    dueDate: new Date('2024-12-31'),
    lastReview: new Date('2024-01-01'),
    nextReview: new Date('2024-12-31'),
    riskLevel: 'low',
    documentStatus: 'approved'
  },
  {
    id: 'PSA-005',
    title: 'Arbeidsmiljørapport',
    description: 'Årlig rapportering om arbeidsmiljø og HMS-tiltak',
    authority: 'PSA',
    category: 'safety',
    status: 'pending',
    dueDate: new Date('2024-04-01'),
    lastReview: new Date('2023-04-01'),
    nextReview: new Date('2024-04-01'),
    riskLevel: 'medium',
    documentStatus: 'draft'
  }
];

const regulatoryFrameworks: RegulatoryFramework[] = [
  {
    name: 'Styringsforskriften',
    authority: 'Petroleumstilsynet (PSA)',
    description: 'Forskrift om styring og ledelse i petroleumsvirksomheten',
    applicableToOil: true,
    applicableToGas: true,
    lastUpdate: new Date('2023-01-01'),
    nextRevision: new Date('2025-01-01'),
    complianceLevel: 94.2
  },
  {
    name: 'Innretningsforskriften',
    authority: 'Petroleumstilsynet (PSA)',
    description: 'Forskrift om utforming og utrustning av faste innretninger',
    applicableToOil: true,
    applicableToGas: true,
    lastUpdate: new Date('2023-06-15'),
    nextRevision: new Date('2025-06-15'),
    complianceLevel: 97.8
  },
  {
    name: 'Aktivitetsforskriften',
    authority: 'Petroleumstilsynet (PSA)',
    description: 'Forskrift om gjennomføring av aktiviteter i petroleumsvirksomheten',
    applicableToOil: true,
    applicableToGas: true,
    lastUpdate: new Date('2023-03-01'),
    nextRevision: new Date('2025-03-01'),
    complianceLevel: 91.5
  }
];

export const RegulatoryComplianceDashboard: React.FC = () => {
  const [complianceData, setComplianceData] = useState<ComplianceRequirement[]>(mockComplianceData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [overallCompliance, setOverallCompliance] = useState<number>(0);

  useEffect(() => {
    // Calculate overall compliance score
    const compliantItems = complianceData.filter(item => item.status === 'compliant').length;
    const totalItems = complianceData.length;
    setOverallCompliance((compliantItems / totalItems) * 100);
  }, [complianceData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle color="success" />;
      case 'pending': return <Schedule color="warning" />;
      case 'overdue': return <Error color="error" />;
      case 'non-compliant': return <Warning color="error" />;
      default: return <Schedule />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'compliant': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      case 'non-compliant': return 'error';
      default: return 'info';
    }
  };

  const getRiskColor = (risk: string): 'success' | 'warning' | 'error' | 'info' => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'info';
    }
  };

  const getAuthorityFullName = (authority: string): string => {
    switch (authority) {
      case 'NPD': return norwegianTranslations.norwegianPetroleumDirectorate;
      case 'PSA': return norwegianTranslations.petroleumSafetyAuthority;
      case 'NEA': return norwegianTranslations.environmentalAgency;
      case 'NOA': return 'Norges Oljemuseum';
      default: return authority;
    }
  };

  const filteredData = selectedCategory === 'all' 
    ? complianceData 
    : complianceData.filter(item => item.category === selectedCategory);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        {norwegianTranslations.regulatoryCompliance} Dashboard
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        Norsk petroleumsregulering og HMS-overholdelse
      </Typography>

      {/* Overall Compliance Score */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <ComplianceCard>
          <CardContent sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Total {norwegianTranslations.regulatoryCompliance}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flex: 1, mr: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={overallCompliance}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: overallCompliance > 80 ? '#10b981' : overallCompliance > 60 ? '#f59e0b' : '#ef4444'
                    }
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {overallCompliance.toFixed(1)}%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {complianceData.filter(item => item.status === 'compliant').length} av {complianceData.length} krav oppfylt
            </Typography>
          </CardContent>
        </ComplianceCard>

        <RegulationCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Aktive Forskrifter
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {regulatoryFrameworks.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Petroleumstilsynet og Oljedirektoratet
            </Typography>
          </CardContent>
        </RegulationCard>

        <AuditCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Forestående Revisjoner
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {complianceData.filter(item => 
                new Date(item.nextReview).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000
              ).length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Neste 30 dager
            </Typography>
          </CardContent>
        </AuditCard>
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Filtrer etter kategori:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['all', 'safety', 'environmental', 'operational', 'reporting'].map(category => (
            <Chip
              key={category}
              label={category === 'all' ? 'Alle' : 
                category === 'safety' ? 'Sikkerhet' :
                category === 'environmental' ? 'Miljø' :
                category === 'operational' ? 'Operasjonell' : 
                'Rapportering'}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Compliance Requirements List & Regulatory Frameworks */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Compliance Krav ({filteredData.length})
            </Typography>
            <List>
              {filteredData.map((requirement, index) => (
                <React.Fragment key={requirement.id}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      {getStatusIcon(requirement.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {requirement.title}
                          </Typography>
                          <Chip 
                            label={requirement.authority}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Chip 
                            label={requirement.status}
                            size="small"
                            color={getStatusColor(requirement.status)}
                          />
                          <Chip 
                            label={`Risk: ${requirement.riskLevel}`}
                            size="small"
                            color={getRiskColor(requirement.riskLevel)}
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {requirement.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Forfaller: {requirement.dueDate.toLocaleDateString('nb-NO')} | 
                            Sist gjennomgang: {requirement.lastReview.toLocaleDateString('nb-NO')} |
                            Myndighet: {getAuthorityFullName(requirement.authority)}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button variant="outlined" size="small">
                        Vis detaljer
                      </Button>
                      {requirement.status === 'overdue' && (
                        <Button variant="contained" color="error" size="small">
                          Opprett rapport
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                  {index < filteredData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Regulatory Frameworks */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Norske Petroleumsforskrifter
            </Typography>
            {regulatoryFrameworks.map((framework, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {framework.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {framework.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Compliance Score:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={framework.complianceLevel}
                    sx={{ 
                      mt: 0.5, 
                      height: 6, 
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: framework.complianceLevel > 95 ? '#10b981' : '#f59e0b'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {framework.complianceLevel.toFixed(1)}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  {framework.applicableToOil && (
                    <Chip label="Olje" size="small" color="warning" />
                  )}
                  {framework.applicableToGas && (
                    <Chip label="Gass" size="small" color="info" />
                  )}
                </Box>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                  {framework.authority} | Neste revisjon: {framework.nextRevision.toLocaleDateString('nb-NO')}
                </Typography>
              </Paper>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hurtighandlinger
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<Assignment />}>
            Generer månedlig rapport
          </Button>
          <Button variant="outlined" startIcon={<Security />}>
            Oppdater sikkerhetsdokumentasjon
          </Button>
          <Button variant="outlined" startIcon={<Nature />}>
            Miljørapport
          </Button>
          <Button variant="outlined" startIcon={<Engineering />}>
            Teknisk revisjon
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegulatoryComplianceDashboard;