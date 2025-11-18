/**
 * Environmental Report Generator
 * Automated environmental compliance and ESG report generation
 * Supports multiple report formats and customizable templates
 */

import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  Alert,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Description,
  Download,
  Send,
  Preview,
  CheckCircle,
  Schedule,
  Assessment,
  Nature,
  Business,
  Security,
  TrendingUp,
  CloudDownload,
  Email,
  Share,
} from '@mui/icons-material';

// Styled components
const ReportContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  color: 'white',
  marginBottom: theme.spacing(4),
}));

interface ReportConfig {
  reportType:
    | 'environmental'
    | 'esg'
    | 'carbon'
    | 'sustainability'
    | 'compliance';
  period: 'monthly' | 'quarterly' | 'annual';
  startDate: string;
  endDate: string;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  sections: string[];
  recipients: string[];
  includeCharts: boolean;
  includeRecommendations: boolean;
  includeComparison: boolean;
}

interface ReportTemplate {
  type: ReportConfig['reportType'];
  name: string;
  description: string;
  icon: React.ReactNode;
  sections: string[];
  estimatedPages: number;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    type: 'environmental',
    name: 'Environmental Compliance Report',
    description:
      'Comprehensive emissions, waste, and water management reporting',
    icon: <Nature />,
    sections: [
      'Executive Summary',
      'Emissions Data (Scope 1, 2, 3)',
      'Waste Management',
      'Water Usage & Quality',
      'Regulatory Compliance Status',
      'Environmental Incidents',
      'Recommendations',
    ],
    estimatedPages: 15,
  },
  {
    type: 'esg',
    name: 'ESG Performance Report',
    description:
      'Environmental, Social, and Governance metrics and performance',
    icon: <Business />,
    sections: [
      'Executive Summary',
      'Environmental Performance',
      'Social Responsibility',
      'Governance Metrics',
      'ESG Ratings & Certifications',
      'Stakeholder Engagement',
      'Forward-Looking Statements',
    ],
    estimatedPages: 25,
  },
  {
    type: 'carbon',
    name: 'Carbon Footprint Report',
    description: 'Detailed carbon emissions analysis and reduction tracking',
    icon: <CloudDownload />,
    sections: [
      'Executive Summary',
      'Carbon Footprint Overview',
      'Scope 1 Emissions Breakdown',
      'Scope 2 Emissions Breakdown',
      'Scope 3 Emissions Breakdown',
      'Carbon Intensity Analysis',
      'Net-Zero Progress',
      'Reduction Initiatives',
    ],
    estimatedPages: 12,
  },
  {
    type: 'sustainability',
    name: 'Sustainability Report',
    description: 'Comprehensive sustainability performance and goals',
    icon: <TrendingUp />,
    sections: [
      'Sustainability Vision & Strategy',
      'Environmental Impact',
      'Social Impact',
      'Economic Impact',
      'UN SDG Alignment',
      'Climate Goals & Targets',
      'Renewable Energy Integration',
      'Circular Economy Initiatives',
    ],
    estimatedPages: 30,
  },
  {
    type: 'compliance',
    name: 'Regulatory Compliance Report',
    description:
      'Compliance status with environmental regulations and standards',
    icon: <Security />,
    sections: [
      'Regulatory Framework',
      'Compliance Status Overview',
      'Permit & License Status',
      'Audit Results',
      'Non-Compliance Issues',
      'Corrective Actions',
      'Upcoming Requirements',
    ],
    estimatedPages: 18,
  },
];

const SECTION_OPTIONS = [
  'Executive Summary',
  'Emissions Data',
  'Waste Management',
  'Water Usage',
  'Energy Consumption',
  'Biodiversity Impact',
  'Social Metrics',
  'Governance Metrics',
  'Compliance Status',
  'Incident Reports',
  'Recommendations',
  'Forward-Looking Statements',
];

export const ReportGenerator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const [config, setConfig] = useState<ReportConfig>({
    reportType: 'environmental',
    period: 'monthly',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    format: 'pdf',
    sections: [],
    recipients: [],
    includeCharts: true,
    includeRecommendations: true,
    includeComparison: false,
  });

  const [recipientEmail, setRecipientEmail] = useState('');

  const steps = [
    'Select Report Type',
    'Configure Details',
    'Review & Generate',
  ];

  const selectedTemplate = REPORT_TEMPLATES.find(
    t => t.type === config.reportType
  );

  const handleNext = () => {
    if (activeStep === 0 && config.sections.length === 0) {
      // Auto-select sections from template
      setConfig(prev => ({
        ...prev,
        sections: selectedTemplate?.sections || [],
      }));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSectionToggle = (section: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section],
    }));
  };

  const handleAddRecipient = () => {
    if (recipientEmail && !config.recipients.includes(recipientEmail)) {
      setConfig(prev => ({
        ...prev,
        recipients: [...prev.recipients, recipientEmail],
      }));
      setRecipientEmail('');
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setConfig(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email),
    }));
  };

  const handleGenerate = async () => {
    setGenerating(true);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    setGenerating(false);
    setReportGenerated(true);
  };

  const handleDownload = () => {
    // Create a mock report data object
    const reportData = {
      title: `${selectedTemplate?.name} - ${config.period}`,
      generatedDate: new Date().toISOString(),
      period: {
        start: config.startDate,
        end: config.endDate,
      },
      sections: config.sections,
      format: config.format,
      includeCharts: config.includeCharts,
      includeRecommendations: config.includeRecommendations,
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `environmental-report-${Date.now()}.${config.format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant='h6' gutterBottom>
              Choose a Report Template
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Select the type of report you want to generate
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {REPORT_TEMPLATES.map(template => (
                <Card
                  key={template.type}
                  sx={{
                    cursor: 'pointer',
                    border: config.reportType === template.type ? 2 : 1,
                    borderColor:
                      config.reportType === template.type
                        ? 'primary.main'
                        : 'divider',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() =>
                    setConfig(prev => ({ ...prev, reportType: template.type }))
                  }
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: 'primary.main', mr: 1 }}>
                        {template.icon}
                      </Box>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {template.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      {template.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`${template.sections.length} sections`}
                        size='small'
                        variant='outlined'
                      />
                      <Chip
                        label={`~${template.estimatedPages} pages`}
                        size='small'
                        variant='outlined'
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant='h6' gutterBottom>
              Configure Report Details
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                mt: 3,
              }}
            >
              <Box>
                <Typography variant='subtitle2' gutterBottom>
                  Reporting Period
                </Typography>
                <FormControl component='fieldset'>
                  <RadioGroup
                    value={config.period}
                    onChange={e =>
                      setConfig(prev => ({
                        ...prev,
                        period: e.target.value as ReportConfig['period'],
                      }))
                    }
                  >
                    <FormControlLabel
                      value='monthly'
                      control={<Radio />}
                      label='Monthly'
                    />
                    <FormControlLabel
                      value='quarterly'
                      control={<Radio />}
                      label='Quarterly'
                    />
                    <FormControlLabel
                      value='annual'
                      control={<Radio />}
                      label='Annual'
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  label='Start Date'
                  type='date'
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  value={config.startDate}
                  onChange={e =>
                    setConfig(prev => ({ ...prev, startDate: e.target.value }))
                  }
                />

                <TextField
                  label='End Date'
                  type='date'
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  value={config.endDate}
                  onChange={e =>
                    setConfig(prev => ({ ...prev, endDate: e.target.value }))
                  }
                />

                <Typography variant='subtitle2' gutterBottom sx={{ mt: 3 }}>
                  Report Format
                </Typography>
                <FormControl component='fieldset'>
                  <RadioGroup
                    value={config.format}
                    onChange={e =>
                      setConfig(prev => ({
                        ...prev,
                        format: e.target.value as ReportConfig['format'],
                      }))
                    }
                  >
                    <FormControlLabel
                      value='pdf'
                      control={<Radio />}
                      label='PDF Document'
                    />
                    <FormControlLabel
                      value='excel'
                      control={<Radio />}
                      label='Excel Spreadsheet'
                    />
                    <FormControlLabel
                      value='csv'
                      control={<Radio />}
                      label='CSV Data File'
                    />
                    <FormControlLabel
                      value='json'
                      control={<Radio />}
                      label='JSON (API)'
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <Typography variant='subtitle2' gutterBottom>
                  Report Sections
                </Typography>
                <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                  {SECTION_OPTIONS.map(section => (
                    <FormControlLabel
                      key={section}
                      control={
                        <Checkbox
                          checked={config.sections.includes(section)}
                          onChange={() => handleSectionToggle(section)}
                        />
                      }
                      label={section}
                      sx={{ display: 'block' }}
                    />
                  ))}
                </Paper>

                <Typography variant='subtitle2' gutterBottom sx={{ mt: 3 }}>
                  Additional Options
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.includeCharts}
                      onChange={e =>
                        setConfig(prev => ({
                          ...prev,
                          includeCharts: e.target.checked,
                        }))
                      }
                    />
                  }
                  label='Include charts and visualizations'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.includeRecommendations}
                      onChange={e =>
                        setConfig(prev => ({
                          ...prev,
                          includeRecommendations: e.target.checked,
                        }))
                      }
                    />
                  }
                  label='Include recommendations'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.includeComparison}
                      onChange={e =>
                        setConfig(prev => ({
                          ...prev,
                          includeComparison: e.target.checked,
                        }))
                      }
                    />
                  }
                  label='Include historical comparison'
                />
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Email Recipients (optional)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  placeholder='email@example.com'
                  type='email'
                  fullWidth
                  size='small'
                  value={recipientEmail}
                  onChange={e => setRecipientEmail(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddRecipient()}
                />
                <Button variant='outlined' onClick={handleAddRecipient}>
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {config.recipients.map(email => (
                  <Chip
                    key={email}
                    label={email}
                    onDelete={() => handleRemoveRecipient(email)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant='h6' gutterBottom>
              Review & Generate Report
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Report Summary
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Description color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Report Type'
                    secondary={selectedTemplate?.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Period'
                    secondary={`${config.startDate} to ${config.endDate} (${config.period})`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Assessment color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Format'
                    secondary={config.format.toUpperCase()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Sections'
                    secondary={`${config.sections.length} sections selected`}
                  />
                </ListItem>
                {config.recipients.length > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <Email color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Recipients'
                      secondary={`Will be sent to ${config.recipients.length} recipient(s)`}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>

            {!reportGenerated ? (
              <Box>
                {generating && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mt: 1, textAlign: 'center' }}
                    >
                      Generating report...
                    </Typography>
                  </Box>
                )}
                <Button
                  variant='contained'
                  size='large'
                  fullWidth
                  onClick={handleGenerate}
                  disabled={generating}
                  startIcon={<Description />}
                >
                  {generating ? 'Generating Report...' : 'Generate Report'}
                </Button>
              </Box>
            ) : (
              <Box>
                <Alert severity='success' sx={{ mb: 2 }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Report Generated Successfully!
                  </Typography>
                  <Typography variant='body2'>
                    Your environmental report is ready for download or
                    distribution.
                  </Typography>
                </Alert>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant='contained'
                    startIcon={<Download />}
                    onClick={handleDownload}
                  >
                    Download Report
                  </Button>
                  {config.recipients.length > 0 && (
                    <Button variant='outlined' startIcon={<Send />}>
                      Send to Recipients
                    </Button>
                  )}
                  <Button variant='outlined' startIcon={<Preview />}>
                    Preview Report
                  </Button>
                  <Button variant='outlined' startIcon={<Share />}>
                    Share Link
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <ReportContainer>
      <HeaderCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Description fontSize='large' />
            <Box>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                Environmental Report Generator
              </Typography>
              <Typography variant='body1' sx={{ opacity: 0.9 }}>
                Automated compliance and sustainability report generation
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </HeaderCard>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant='contained'
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 2 ? 'Review' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ReportContainer>
  );
};

export default ReportGenerator;
