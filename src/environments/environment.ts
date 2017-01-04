// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  getCurrentInvoice : 'http://192.168.26.15:8080/invoice/currectinvoice',
  getBillingDetails: 'http://192.168.26.15:8080/invoice/billingdetails',
  getLast2Invoices: 'http://192.168.26.15:8080/tickets/lasttwo',
  last2Months : 'http://192.168.26.15:8080/invoice/last2Month',
  createTicket : 'http://192.168.26.15:8080/tickets/create',
  getSampleData : 'http://192.168.26.15:8080/sample/getData',
  getAllTickets : 'http://192.168.26.15:8080/tickets/all',
  getAllInvoices : 'http://192.168.26.15:8080/invoice/all'
};
