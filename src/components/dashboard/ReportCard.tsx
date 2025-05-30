import React from 'react';
import { Card, CardBody, CardFooter, Box, Text, Button } from 'grommet';
import { FormView, Alert } from 'grommet-icons';
import { format } from 'date-fns';

interface ReportCardProps {
  id: string;
  datahall: string;
  status: string;
  issue: string;
  timestamp: string;
  onClick: () => void;
}

export const ReportCard = ({
  id,
  datahall,
  status,
  issue,
  timestamp,
  onClick,
}: ReportCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'operational':
        return 'status-ok';
      case 'maintenance':
        return 'status-warning';
      case 'alert':
        return 'status-critical';
      case 'offline':
        return 'status-disabled';
      default:
        return 'status-unknown';
    }
  };

  return (
    <Card background="light-1" onClick={onClick} hoverIndicator>
      <CardBody pad="medium">
        <Box gap="small">
          <Box direction="row" justify="between" align="center">
            <Box direction="row" gap="small" align="center">
              <Alert color="status-critical" size="small" />
              <Text weight="bold">{datahall}</Text>
              <Box
                background={getStatusColor(status)}
                pad={{ horizontal: 'small', vertical: 'xxsmall' }}
                round="small"
              >
                <Text size="xsmall">{status}</Text>
              </Box>
            </Box>
            <Text size="small" color="dark-5">
              {format(new Date(timestamp), 'MMM d, yyyy')}
            </Text>
          </Box>
          <Box>
            <Text size="small" color="dark-3">
              Issue:
            </Text>
            <Text size="small" truncate>
              {issue}
            </Text>
          </Box>
        </Box>
      </CardBody>
      <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }} background="light-2">
        <Text size="small" truncate>
          ID: {id.substring(0, 8)}...
        </Text>
        <Button
          icon={<FormView size="small" />}
          hoverIndicator
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        />
      </CardFooter>
    </Card>
  );
};
