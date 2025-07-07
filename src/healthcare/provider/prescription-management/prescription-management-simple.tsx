import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { Text } from '../../../core/atoms/text/text';
import { Card } from '../../../core/organisms/card/card';
import { Button } from '../../../core/atoms/button/button';
import { Badge } from '../../../core/atoms/badge';
import { BaseComponentProps, mergeClasses } from '../../../design-system/props';
import { Icon } from '../../../core/atoms/icon';

export interface Prescription {
  id: string;
  medicationName: string;
  genericName?: string;
  strength: string;
  dosage: string;
  frequency: string;
  route: string;
  quantity: number;
  refillsRemaining: number;
  totalRefills: number;
  prescribedDate: string;
  expiryDate: string;
  lastRefillDate?: string;
  nextRefillDate?: string;
  prescriber: string;
  pharmacy: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  ndc?: string;
  status: 'active' | 'expired' | 'discontinued' | 'pending' | 'completed';
  instructions: string;
  warnings?: string[];
  interactions?: string[];
  sideEffects?: string[];
  cost?: number;
  insuranceCovered?: boolean;
  isGeneric?: boolean;
  isPrn?: boolean;
  notes?: string;
}

export interface PrescriptionManagementProps extends Omit<BaseComponentProps<HTMLDivElement>, `on${string}$`> {
  patientId: string;
  prescriptions: Prescription[];
  onPrescriptionClick?: (prescription: Prescription) => void;
  onRefillRequest?: (prescriptionId: string) => void;
  onAddPrescription?: () => void;
  isEditable?: boolean;
  showFilters?: boolean;
}

export const PrescriptionManagement = component$<PrescriptionManagementProps>((props) => {
  const {
    prescriptions = [],
    onPrescriptionClick,
    onRefillRequest,
    onAddPrescription,
    isEditable = false,
    showFilters = true,
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  const searchTerm = useSignal('');

  const handleRefillRequest = $((prescriptionId: string) => {
    onRefillRequest && onRefillRequest(prescriptionId);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days <= 30;
  };

  // Create merged class names for consistent styling
  const prescriptionManagementClasses = mergeClasses(
    "prescription-management bg-white rounded-lg shadow-sm border border-neutral-light",
    qwikClass,
    className
  );

  return (
    <div class="themed-content">
      <div class={prescriptionManagementClasses} style={style} {...rest}>
        {/* Header */}
        <div class="border-b border-neutral-light p-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <Icon icon="pill" class="w-5 h-5 text-primary-600" />
              <Text as="h3" weight="semibold" size="lg" color="blue-900">Prescription Management</Text>
              <span class="text-sm text-neutral-normal">({prescriptions.length} prescriptions)</span>
            </div>
            {isEditable && onAddPrescription && (
              <Button
                onClick$={$(() => onAddPrescription && onAddPrescription())}
                variant="elevated"
                color="primary"
                size="sm"
                leftIcon={true}
              >
                <Icon icon="plus" class="w-4 h-4 mr-1" />
                Add Prescription
              </Button>
            )}
          </div>

          {/* Search */}
          <div class="relative">
            <Icon icon="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-light" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm.value}
              onInput$={$((e) => searchTerm.value = (e.target as HTMLInputElement).value)}
              class="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus:ring-2 focus:ring-primary-normal focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div class="p-4">
          {prescriptions.length === 0 ? (
            <div class="text-center py-8">
              <Icon icon="pill" class="w-12 h-12 text-neutral-light mx-auto mb-4" />
              <Text as="p" color="gray-500">No prescriptions found</Text>
              {isEditable && onAddPrescription && (
                <Button
                  onClick$={$(() => onAddPrescription && onAddPrescription())}
                  variant="text"
                  color="primary"
                  size="sm"
                  class="mt-4"
                >
                  Add the first prescription
                </Button>
              )}
            </div>
          ) : (
            <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} variant="elevated" padding="4" class="hover:shadow-md transition-shadow">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <Text as="h4" weight="semibold" size="lg" color="blue-900">{prescription.medicationName}</Text>
                      {prescription.genericName && (
                        <Text as="p" size="sm" color="gray-600">Generic: {prescription.genericName}</Text>
                      )}
                      <div class="flex items-center space-x-2 mt-1">
                        <Badge
                          color={prescription.status === 'active' ? 'success' : 
                                 prescription.status === 'expired' ? 'error' :
                                 prescription.status === 'pending' ? 'warning' : 'secondary'}
                          variant="outlined"
                          size="sm"
                        >
                          {prescription.status}
                        </Badge>
                        <Badge
                          color="info"
                          variant="flat"
                          size="sm"
                        >
                          {prescription.route}
                        </Badge>
                        {prescription.isPrn && (
                          <Badge
                            color="warning"
                            variant="flat"
                            size="sm"
                          >
                            PRN
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      {isExpiringSoon(prescription.expiryDate) && (
                        <Icon icon="alert-triangle" class="w-5 h-5 text-warning-normal" />
                      )}
                    </div>
                  </div>

                  <div class="space-y-2 mb-4">
                    <div class="flex justify-between text-sm">
                      <span class="text-neutral-normal">Strength:</span>
                      <span class="font-medium">{prescription.strength}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-neutral-normal">Dosage:</span>
                      <span class="font-medium">{prescription.dosage}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-neutral-normal">Frequency:</span>
                      <span class="font-medium">{prescription.frequency}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-neutral-normal">Refills:</span>
                      <span class={`font-medium ${prescription.refillsRemaining <= 2 ? 'text-warning-normal' : 'text-neutral-darker'}`}>
                        {prescription.refillsRemaining} of {prescription.totalRefills}
                      </span>
                    </div>
                  </div>

                  <div class="border-t border-neutral-lighter pt-3 space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-neutral-normal flex items-center">
                        <Icon icon="calendar" class="w-4 h-4 mr-1" />
                        Expires:
                      </span>
                      <span class={`font-medium ${isExpiringSoon(prescription.expiryDate) ? 'text-warning-normal' : 'text-neutral-darker'}`}>
                        {formatDate(prescription.expiryDate)}
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-neutral-normal">Prescriber:</span>
                      <span class="font-medium">Dr. {prescription.prescriber}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-neutral-normal flex items-center">
                        <Icon icon="map-pin" class="w-4 h-4 mr-1" />
                        Pharmacy:
                      </span>
                      <span class="font-medium">{prescription.pharmacy}</span>
                    </div>
                  </div>

                  {prescription.instructions && (
                    <div class="mt-3 p-2 bg-primary-50 rounded text-sm">
                      <Text as="p" color="blue-800">{prescription.instructions}</Text>
                    </div>
                  )}

                  <div class="mt-4 flex items-center justify-between">
                    <Button
                      onClick$={$(() => onPrescriptionClick && onPrescriptionClick(prescription))}
                      variant="text"
                      color="primary"
                      size="sm"
                    >
                      View Details
                    </Button>
                    {prescription.refillsRemaining > 0 && prescription.status === 'active' && (
                      <Button
                        onClick$={$(() => handleRefillRequest(prescription.id))}
                        variant="elevated"
                        color="primary"
                        size="sm"
                        leftIcon={true}
                      >
                        <Icon icon="refresh-cw" class="w-4 h-4 mr-1" />
                        Request Refill
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
