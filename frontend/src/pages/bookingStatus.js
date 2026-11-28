export const statusStyles = {
  'Pending': 'bg-amber-100 text-amber-800',
  'Approved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Cancelled': 'bg-gray-100 text-gray-800',
  'Ready for Pickup': 'bg-blue-100 text-blue-800',
  'Picked Up': 'bg-purple-100 text-purple-800',
};

export const formatDate = (value) => new Date(value).toLocaleString();

export const customerName = (customer) =>
  customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown customer';
