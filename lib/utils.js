/* eslint-disable new-cap */
import moment from 'moment';
import React from 'react';
import 'moment/locale/id';
import { createBrowserHistory } from 'history';
import { QueryClient } from '@tanstack/react-query';
import crypto from 'crypto';
import { Buffer } from 'buffer';
import { isEmpty, get } from 'lodash';
import Config from './config';
import useAuthStore from './hooks/zustand/auth.store';

const algorithm = 'aes-256-gcm';

export const BASE_PREFIX = Config.BASE_PREFIX || '/';

export const homePrefix = `${BASE_PREFIX}homepage`;
export const dashboardPrefix = `${BASE_PREFIX}dashboard`;
export const agreementPrefix = `${BASE_PREFIX}agreement`;
export const corporateInfotPrefix = `${BASE_PREFIX}corporate-info`;
export const orderingPrefix = `${BASE_PREFIX}ordering`;
export const salesplanPrefix = `${BASE_PREFIX}sales-plan`;
export const billingCollectionPrefix = `${BASE_PREFIX}billing-collection`;
export const miscPrefix = `${BASE_PREFIX}misc`;
export const dummyServicePrefix = `${BASE_PREFIX}dummy-service`;
export const loginPrefix = `${BASE_PREFIX}login`;
export const ticketPrefix = `${BASE_PREFIX}ticket`;
export const logoutPrefix = `${BASE_PREFIX}logout`;

// routes
export const Checkpoints = {
  index: BASE_PREFIX,
  homePage: homePrefix,
  subscriberProfile: `${homePrefix}/subscriber-profile/:msisdn/:tab`,
  projectDetailSubscriber: `${homePrefix}/subscriber-profile/:msisdn/project/:projectId/detail-benefit/:benefitId`,
  detailBussinessSolution: `${homePrefix}/subscriber-profile/:msisdn/bussiness-solution/projectSubsId/:projectSubsId/serviceId/:serviceId`,
  detailRequestBussinessSolution: `${homePrefix}/subscriber-profile/:msisdn/bussiness-solution/projectSubsId/:projectSubsId/serviceId/:serviceId/detail-request/:requestId`,
  blockedMsisdn: `${homePrefix}/pemblokiran/:id`,
  amDashboard: `${dashboardPrefix}/am-dashboard`,
  dashboardPBCM: `${dashboardPrefix}/pbcm-dashboard`,
  detailExecuteOrder: `${homePrefix}/subscriber-profile/:msisdn/execute-order/:orderId`,
  activityExecuteOrder: `${homePrefix}/subscriber-profile/:msisdn/execute-order/:orderId/activity`,
  dashboard: dashboardPrefix,
  agreementList: agreementPrefix,
  agreementDetail: `${agreementPrefix}/:agreementId`,
  digitalContractList: `${agreementPrefix}/digital`,
  createAgreement: `${agreementPrefix}/create-agreement-document/:opportunityId`,
  editDraftContract: `${agreementPrefix}/edit-draft-contract/:draftId/:opportunityId`,
  editDigitalContract: `${agreementPrefix}/edit-digital-contract/:agreementId`,
  viewDraftContract: `${agreementPrefix}/view-draft-contract/:draftId`,
  viewDigitalContract: `${agreementPrefix}/view-digital-contract/:agreementId`,
  editNonDigitalContract: `${agreementPrefix}/edit-non-digital-contract/:opportunityId`,

  corporateList: `${corporateInfotPrefix}/corporates`,
  corporateListDetails: `${corporateInfotPrefix}/corporates/:id`,
  projectList: `${corporateInfotPrefix}/projects`,
  picOrderDetailUnderProject: `${corporateInfotPrefix}/projects/:id/pic-order/:picOrderId`,
  projectDetails: `${corporateInfotPrefix}/projects/:id`,
  projectDetailCreateOrder: `${corporateInfotPrefix}/projects/:id/create-order`,
  projectDetailQuotationList: `${corporateInfotPrefix}/projects/:id/quotation-list`,
  projectDetailSplitBillDetail: `${corporateInfotPrefix}/projects/:id/split-bill/:benefitId`,
  projectDetailCreateOrderQuotation: `${corporateInfotPrefix}/projects/:id/create-order-quotation`,
  picDetails: `${corporateInfotPrefix}/projects/:id/pic/:picId`,
  productsList: `${corporateInfotPrefix}/products`,
  businessSolutionList: `${corporateInfotPrefix}/business-solution`,
  corporatePicDetail: `${corporateInfotPrefix}/corporates/:id/pic/:picId`,

  provisioningList: `${orderingPrefix}/provisioning`,
  provisioningDetail: `${orderingPrefix}/provisioning/:id/:orderType`,
  provisioningMsisdnDetail: `${orderingPrefix}/provisioning/:id/:orderType/:msisdn`,
  provisioningexecutedOrderDetails: `${orderingPrefix}/provisioning/:id/:orderType/:msisdn/:orderId`,
  picOrdersList: `${orderingPrefix}/pic-orders`,
  picOrdersDetail: `${orderingPrefix}/pic-orders/detail/:picOrderId`,
  cartDetail: `${orderingPrefix}/pic-orders/detail/:picOrderId/cart/:orderId`,

  leadsList: `${salesplanPrefix}/leads`,
  leadsDetail: `${salesplanPrefix}/leads/:id`,
  createLeads: `${salesplanPrefix}/leads/create-lead`,
  uploadMultipleLeads: `${salesplanPrefix}/leads/create-lead/multiple/upload`,
  multipleLeadsDetail: `${salesplanPrefix}/leads/create-lead/multiple/:orderId`,
  opptyList: `${salesplanPrefix}/opportunity`,
  opptyDetails: `${salesplanPrefix}/opportunity/:id`,
  addOppty: `${salesplanPrefix}/opportunity/add`,
  repeatOrderOppty: `${salesplanPrefix}/opportunity/add/:id`,
  editOppty: `${salesplanPrefix}/opportunity/edit/:id`,
  quoteDetail: `${salesplanPrefix}/opportunity/:id/quote/:quoteId`,
  quoteAddDiscount: `${salesplanPrefix}/opportunity/:id/quote/:quoteId/add-discount`,
  quoteDetailAddProduct: `${salesplanPrefix}/opportunity/:id/quote/:quoteId/add-product/:bundleType/:bundleTypeId`,
  quoteDetailAddProductDenom: `${salesplanPrefix}/opportunity/:id/quote/:quoteId/add-product/:bundleType/:bundleTypeId/:offerId/:offerName/:subsetMenuId`,
  quoteDetailDenomDetail: `${salesplanPrefix}/opportunity/:id/quote/:quoteId/add-product/:bundleType/:bundleTypeId/:offerId/:offerName/:subsetMenuId/denom`,
  quoteDetailAddAdditionalDenom: `${salesplanPrefix}/opportunity/:id/quote/:quoteId/add-product/:bundleType/:bundleTypeId/:offerId/:offerName/:subsetMenuId/add-denom`,

  paymentReportList: `${billingCollectionPrefix}/payment-report`,
  searchProfileBilling: `${billingCollectionPrefix}/search-profile-billing`,
  profileBillingDetail: `${billingCollectionPrefix}/search-profile-billing/:searchType/:id`,

  ticketDashboard: `${ticketPrefix}`,
  ticketDetailList: `${ticketPrefix}/detail/:id`,
  ticketCreateNew: `${ticketPrefix}/create`,

  knowledge: `${miscPrefix}/knowledge-center`,
  helpPage: `${miscPrefix}/help`,
  getStartedPage: `${miscPrefix}/getstarted`,

  dummyList: `${dummyServicePrefix}/list`,
  dummyDetail: `${dummyServicePrefix}/detail/:id`,

  callback: `${loginPrefix}/callback`,
  logoutCallback: `${logoutPrefix}/callback`,

  profile: `${BASE_PREFIX}profile`,
  notFound: `${BASE_PREFIX}404`,
};

// INFO: only rba level 1,2 & 3
export const RBA_MENU_ID = {
  // homepage
  home: 'HOME',
  searchMSISDN: 'HOME|MSISDN',

  // dashboard
  dashboardAm: 'DASH|AM',
  dashboardPBCM: 'DASH|PBCM',

  // agreement
  agreementList: 'AGREE|LIST',
  digitalContractProcess: 'AGREE|ECON',
  agreementDetailInformation: 'AGREE|LIST|INFO',
  agreementDetailAmandemen: 'AGREE|LIST|AMEND',
  agreementDetailCorporateList: 'AGREE|LIST|CORP',
  agreementDetailSolutionProduct: 'AGREE|LIST|PROSOL',
  agreementDetailDocumentList: 'AGREE|LIST|DOCS',
  agreementDetailProjectList: 'AGREE|LIST|PROJ',
  agreementDetailSignature: 'AGREE|LIST|SIGN',
  agreementDetailOpportunityList: 'AGREE|LIST|OPPTY',
  agreementDetailPDF: 'AGREE|LIST|PDF',
  agreementDetailDocsDownloadBtn: 'AGREE|LIST|DOCS|DOWN',
  agreementViewDraftDigitalContract: 'AGREE|ECON|DRAFT',
  agreementViewOnCirculationDigitalContract: 'AGREE|ECON|ONCIR',
  agreementViewSignedDigitalContract: 'AGREE|ECON|SIGNED',
  agreementViewDetailDraftDigitalContract: 'AGREE|ECON|VIEW',
  agreementEditDetailDraftDigitalContract: 'AGREE|ECON|EDIT',
  agreementDeleteDraftDigitalContract: 'AGREE|ECON|DEL',

  // corporate
  corporateList: 'CORP|LIST',
  projectList: 'CORP|PROJ',
  businessSolustionList: 'CORP|BSSL',
  corporateInformation: 'CORP|LIST|INFO',
  corporateAccountManagerList: 'CORP|LIST|AM',
  corporatePicList: 'CORP|LIST|PIC',
  corporatePicDetailInfo: 'CORP|LIST|PIC|INFO',
  corporatePicDetailMenuAccess: 'CORP|LIST|PIC|MENU',
  corporateSignerList: 'CORP|LIST|SIGN',
  corporateSignerDownloadKtpBtn: 'CORP|LIST|SIGN|KTP',
  corporateAgreementList: 'CORP|LIST|AGRE',
  corporateAgreementDetail: 'CORP|LIST|AGRE|INFO', // !TODO not implemented yet
  corporateComplienceDownloadBtn: 'CORP|LIST|COMPL|DOWN', // !TODO not implemented yet
  corporateWapuDownloadBtn: 'CORP|LIST|WAPU|DOWN', // !TODO not implemented yet
  corporateProjectList: 'CORP|LIST|PROJ',
  corporateProjectCollectionRate: 'CORP|PROJ|CRDSC|COLLR', // !TODO not implemented yet
  corporateProjectPauseCollection: 'CORP|PROJ|CRDSC|PAUSE', // !TODO not implemented yet
  corporateProjectWorkFlow: 'CORP|PROJ|CRDSC|WORK', // !TODO not implemented yet
  corporateProjectSubscriptionOrderbtn: 'CORP|PROJ|SUBS|ORDER',
  corporateProjectBillPaymentChannel: 'CORP|PROJ|BILL|PYMCH',
  corporateProjectBillVaPayment: 'CORP|PROJ|BILL|VAPAY', // !TODO not implemented yet
  corporateAddressList: 'CORP|LIST|ADDR',
  corporateHierarchy: 'CORP|LIST|HIER',
  corporateKIPList: 'CORP|LIST|KIP',
  corporateLeadsList: 'CORP|LIST|LEADS', // !TODO not implemented yet
  corporateOpportunityList: 'CORP|LIST|OPPTY', // !TODO not implemented yet
  corporateComplianceList: 'CORP|LIST|COMPL', // !TODO not implemented yet
  corporateWapu: 'CORP|LIST|WAPU', // !TODO not implemented yet
  corporateProjectDetailInfo: 'CORP|PROJ|INFO',
  corporateProjectOpportunityList: 'CORP|PROJ|OPPTY',
  corporateProjectCreditScore: 'CORP|PROJ|CRDSC', // !TODO not implemented yet
  corporateProjectPICList: 'CORP|PROJ|PIC',
  corporateProjectQuoteList: 'CORP|PROJ|QUOTE',
  corporateProjectSPTPList: 'CORP|PROJ|SPTP',
  corporateProjectCTPList: 'CORP|PROJ|CTP',
  corporateProjectSubscriptionList: 'CORP|PROJ|SUBS',
  corporateProjectBillingList: 'CORP|PROJ|BILL',
  corporateProjectBusinessSolution: 'CORP|PROJ|BSSL',

  // ordering
  provisioningList: 'ORDER|PROV',
  picOrderList: 'ORDER|PIC',
  orderingProvisioningProjectInfo: 'ORDER|PROV|PROJ',
  orderingProvisioningSummary: 'ORDER|PROV|SUMM',
  orderingProvisioningMSISDNList: 'ORDER|PROV|LMSISDN',
  orderingProvisioningProductDetail: 'ORDER|PROV|PRDTL',
  orderingProvisioningEscalation: 'ORDER|PROV|ESCLN',
  orderingProvisioningActivities: 'ORDER|PROV|ACTVS',
  orderingProvisioningSummaryRetryBtn: 'ORDER|PROV|SUMM|RETRY',
  orderingProvisioningSummaryStuckBtn: 'ORDER|PROV|SUMM|STUCK', // !TODO not implemented yet
  orderingPICRingkasan: 'ORDER|PIC|RNGKSN',
  orderingPICKeranjang: 'ORDER|PIC|KERANJ',
  orderingPIC2FA: 'ORDER|PIC|2FA',
  orderingPICCase: 'ORDER|PIC|CASE',
  orderingPICKeranjangRingkasan: 'ORDER|PIC|KERANJ|RNGKSN',
  orderingPICKeranjangSubscription: 'ORDER|PIC|KERANJ|SUBS',

  // sales plan
  leadsList: 'SPLAN|LEADS',
  opptyList: 'SPLAN|OPPTY',
  splanLeadsEdit: 'SPLAN|LEADS|EDIT',
  splanLeadsDetailInfo: 'SPLAN|LEADS|DETAIL',
  splanLeadsUpdateSetStage: 'SPLAN|LEADS|STG',
  splanLeadsActivitiesInfoList: 'SPLAN|LEADS|ACTVS',
  splanLeadsSupportNeeded: 'SPLAN|LEADS|SUPP',
  splanLeadsActivityAdd: 'SPLAN|LEADS|ACTVS|ADD',
  splanLeadsActivityEdit: 'SPLAN|LEADS|ACTVS|EDIT',
  splanLeadsAddNewBtn: 'SPLAN|LEADS|ADD',
  splanOpptyEdit: 'SPLAN|OPPTY|EDIT',
  splanOpptyDetailInfo: 'SPLAN|OPPTY|DETAIL',
  splanOpptySetStage: 'SPLAN|OPPTY|STG',
  splanOpptyActivitiesList: 'SPLAN|OPPTY|ACTVS',
  splanOpptyQuotationList: 'SPLAN|OPPTY|QTY',
  splanOpptyQuotationEdit: 'SPLAN|OPPTY|QTY|EDIT',
  splanOpptyAddSupportNeeded: 'SPLAN|OPPTY|SUPP|ADD',
  splanOpptyEcontractList: 'SPLAN|OPPTY|ECONN',
  splanOpptyAddNew: 'SPLAN|OPPTY|ADD',
  splanOpptySupportNeededList: 'SPLAN|OPPTY|SUPP',
  splanOpptySupportNeededAddNewticket: 'SPLAN|LEADS|SUPP|ADD',
  splanOpptyAuditLog: 'SPLAN|OPPTY|ECONN|AUD',
  splanOpptyActivityAddNew: 'SPLAN|OPPTY|ACTVS|ADD',
  splanOpptyActivityEdit: 'SPLAN|OPPTY|ACTVS|EDIT',
  splanOpptyQuotationAddNew: 'SPLAN|OPPTY|QTY|ADD',
  splanOpptyEContractAdd: 'SPLAN|OPPTY|ECONN|ADD',
  splanOpptyEContractAction: 'SPLAN|OPPTY|ECONN|ACT',

  // billing collection
  billingSearchProfileFA: 'BILCO|SRCH|FA',
  billingSearchProfileBAR: 'BILCO|SRCH|BA',

  // ticket
  ticket: 'TCKET',
  ditugaskan: 'TCKET|DTGS',
  dibuatSaya: 'TCKET|DBTS',
  ticketCreate: 'TCKET|CRT',
  ticketUpdate: 'TCKET|DETAIL|UPDT',
  ticketChat: 'TCKET|DETAIL|CHT',

  // user access / role management
  roleManagement: 'USRAC|RLM', // !TODO not implemented yet
  userManagement: 'USRAC|USRM', // !TODO not implemented yet
  menuManagement: 'USRAC|MNAG', // !TODO not implemented yet
  userAccessEditAccess: 'USRAC|RLM|EDTAC', // !TODO not implemented yet
  userAccessGroupAccessList: 'USRAC|RLM|GRACC', // !TODO not implemented yet
  userAccessMenuManagement: 'USRAC|MNAG|EDT', // !TODO not implemented yet
  userRoleManagementGroupAccessAdd: 'USRAC|RLM|GRACC|ADD', // !TODO not implemented yet
  userRoleManagementGroupAccessEdit: 'USRAC|RLM|GRACC|EDT', // !TODO not implemented yet
  userRoleManagementGroupAccessRemove: 'USRAC|RLM|GRACC|RMV', // !TODO not implemented yet
};

export const RoutesWithMenuId = {
  [homePrefix]: [
    {
      route: Checkpoints.index,
      menuId: RBA_MENU_ID.home,
      menuName: 'Homepage',
    },
    {
      route: Checkpoints.homePage,
      menuId: RBA_MENU_ID.home,
      menuName: 'Homepage',
    },
    {
      route: Checkpoints.subscriberProfile,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Page',
    },
    {
      route: Checkpoints.projectDetailSubscriber,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Project Detail Page',
    },
    {
      route: Checkpoints.detailBussinessSolution,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Business Solution Detail Page',
    },
    {
      route: Checkpoints.detailRequestBussinessSolution,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Business Soultion Request Detail Page',
    },
    {
      route: Checkpoints.detailExecuteOrder,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Execute Order Page',
    },
    {
      route: Checkpoints.activityExecuteOrder,
      menuId: 'HOME',
      menuName: 'Subscriber Profile Execute Order Activity page',
    },
    {
      route: Checkpoints.blockedMsisdn,
      menuId: RBA_MENU_ID.home,
      menuName: 'Blocked MSISDN Page',
    },
  ],
  [dashboardPrefix]: [
    {
      route: Checkpoints.amDashboard,
      menuId: RBA_MENU_ID.dashboardAm,
      menuName: 'AM Dashboard Page',
    },
    {
      route: Checkpoints.dashboardPBCM,
      menuId: RBA_MENU_ID.dashboardPBCM,
      menuName: 'PBCM Dashboard Page',
    },
  ],
  [agreementPrefix]: [
    {
      route: Checkpoints.agreementList,
      menuId: RBA_MENU_ID.agreementList,
      menuName: 'Agreement List Page',
    },
    {
      route: Checkpoints.agreementDetail,
      menuId: 'AGREE',
      menuName: 'Agreement Detail Page',
    },
    {
      route: Checkpoints.digitalContractList,
      menuId: RBA_MENU_ID.digitalContractProcess,
      menuName: 'Agreement Econtract List Page',
    },
    {
      route: Checkpoints.createAgreement,
      menuId: 'AGREE',
      menuName: 'Create Agreement Page',
    },
    {
      route: Checkpoints.editDraftContract,
      menuId: 'AGREE',
      menuName: 'Edit Agreement Econtract Draft Page',
    },
    {
      route: Checkpoints.editDigitalContract,
      menuId: 'AGREE',
      menuName: 'Edit Agreement Econtract Page',
    },
    {
      route: Checkpoints.viewDraftContract,
      menuId: 'AGREE',
      menuName: 'Agreement View Econtract Draft Page',
    },
    {
      route: Checkpoints.viewDigitalContract,
      menuId: 'AGREE',
      menuName: 'Agreement View Econtract Page',
    },
    {
      route: Checkpoints.editNonDigitalContract,
      menuId: 'AGREE',
      menuName: 'Edit Agreement Non Digital Contract Page',
    },
  ],
  [corporateInfotPrefix]: [
    {
      route: Checkpoints.corporateList,
      menuId: RBA_MENU_ID.corporateList,
      menuName: 'Corporate-Info Corporate List Page',
    },
    {
      route: Checkpoints.corporateListDetails,
      menuId: 'CORP',
      menuName: 'Corporate-Info Corporate Detail Page',
    },
    {
      route: Checkpoints.corporatePicDetail,
      menuId: 'CORP',
      menuName: 'Corporate-Info Corporate PIC Detail Page',
    },
    {
      route: Checkpoints.projectList,
      menuId: RBA_MENU_ID.projectList,
      menuName: 'Corporate-Info Project List Page',
    },
    {
      route: Checkpoints.projectDetails,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail Page',
    },
    {
      route: Checkpoints.picOrderDetailUnderProject,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail PIC Order Detail Page',
    },
    {
      route: Checkpoints.projectDetailCreateOrder,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail Create Order Page',
    },
    {
      route: Checkpoints.projectDetailQuotationList,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail Quotation List Page',
    },
    {
      route: Checkpoints.projectDetailSplitBillDetail,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail Split Bill Detail Page',
    },
    {
      route: Checkpoints.projectDetailCreateOrderQuotation,
      menuId: 'CORP',
      menuName: 'Corporate-Info Project Detail Create Order Quotation Page',
    },
    {
      route: Checkpoints.picDetails,
      menuId: RBA_MENU_ID.corporatePicDetailInfo,
      menuName: 'Corporate-Info Project Detail PIC Project Detail Page',
    },
    {
      route: Checkpoints.productsList,
      menuId: 'CORP',
      menuName: 'Corporate-Info Product List Page',
    },
    {
      route: Checkpoints.businessSolutionList,
      menuId: RBA_MENU_ID.businessSolustionList,
      menuName: 'Corporate-Info Business Solution List Page',
    },
  ],
  [orderingPrefix]: [
    {
      route: Checkpoints.provisioningList,
      menuId: RBA_MENU_ID.provisioningList,
      menuName: 'Order Provisioning List Page',
    },
    {
      route: Checkpoints.provisioningDetail,
      menuId: 'ORDER',
      menuName: 'Order Provisioning Detail Page',
    },
    {
      route: Checkpoints.provisioningMsisdnDetail,
      menuId: 'ORDER',
      menuName: 'Order Provisioning Detail MSISDN Detail Page',
    },
    {
      route: Checkpoints.provisioningexecutedOrderDetails,
      menuId: 'ORDER',
      menuName: 'Order Provisioning Detail Executed Order Detail Page',
    },
    {
      route: Checkpoints.picOrdersList,
      menuId: RBA_MENU_ID.picOrderList,
      menuName: 'Order PIC Order List Page',
    },
    {
      route: Checkpoints.picOrdersDetail,
      menuId: 'ORDER',
      menuName: 'Order PIC Order Detail Page',
    },
    {
      route: Checkpoints.cartDetail,
      menuId: 'ORDER',
      menuName: 'Order PIC Order Cart Detail Page',
    },
  ],
  [salesplanPrefix]: [
    {
      route: Checkpoints.leadsList,
      menuId: RBA_MENU_ID.leadsList,
      menuName: 'SalesPlan Leads List Page',
    },
    {
      route: Checkpoints.leadsDetail,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Leads Detail Page',
    },
    {
      route: Checkpoints.createLeads,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Create Leads Page',
    },
    {
      route: Checkpoints.uploadMultipleLeads,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Create Multiple Leads Page',
    },
    {
      route: Checkpoints.multipleLeadsDetail,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Create Multiple Leads Detail Page',
    },
    {
      route: Checkpoints.opptyList,
      menuId: RBA_MENU_ID.opptyList,
      menuName: 'SalesPlan Opportunity List Page',
    },
    {
      route: Checkpoints.opptyDetails,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Opportunity Detail Page',
    },
    {
      route: Checkpoints.addOppty,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Create New Opportunity Page',
    },
    {
      route: Checkpoints.editOppty,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Edit Opportunity Page',
    },
    {
      route: Checkpoints.repeatOrderOppty,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Create Repeat Order Opportunity Page',
    },
    {
      route: Checkpoints.quoteDetail,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Quotation Detail Page',
    },
    {
      route: Checkpoints.quoteDetailAddProduct,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Quotation Add Product Page',
    },
    {
      route: Checkpoints.quoteAddDiscount,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Quotation Add Discount Page',
    },
    {
      route: Checkpoints.quoteDetailAddProductDenom,
      menuId: 'SPLAN',
      menuName: 'SalesPLan Quotation Product Add Product Denom Page',
    },
    {
      route: Checkpoints.quoteDetailDenomDetail,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Quotation Product Denom Detail Page',
    },
    {
      route: Checkpoints.quoteDetailAddAdditionalDenom,
      menuId: 'SPLAN',
      menuName: 'SalesPlan Quotation Product Denom Add Additional Denom Page',
    },
  ],
  [billingCollectionPrefix]: [
    {
      route: Checkpoints.paymentReportList,
      menuId: 'BILCO',
      menuName: 'BillingCollection Payment Report Page',
    },
    {
      route: Checkpoints.searchProfileBilling,
      menuId: 'BILCO',
      menuName: 'BillingCollection Search Billing Page',
    },
    {
      route: Checkpoints.profileBillingDetail,
      menuId: 'BILCO',
      menuName: 'BillingCollection Profile Billing Detail Page',
    },
  ],
  [ticketPrefix]: [
    {
      route: Checkpoints.ticketDashboard,
      menuId: RBA_MENU_ID.ticket,
      menuName: 'Ticket Dashboard Page',
    },
    {
      route: Checkpoints.ticketDetailList,
      menuId: 'TCKET',
      menuName: 'Ticket List Detail Page',
    },
    {
      route: Checkpoints.ticketCreateNew,
      menuId: 'TCKET',
      menuName: 'Ticket Create New Ticket Page',
    },
  ],
  default: [
    loginPrefix,
    Checkpoints.logoutCallback,
    Checkpoints.callback,
    Checkpoints.knowledge,
    Checkpoints.helpPage,
    Checkpoints.profile,
  ],
};

export const useStateWithCallback = (initialValue) => {
  const callbackRef = React.useRef(null);

  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = React.useCallback((newValue, callback) => {
    callbackRef.current = callback;

    return setValue(newValue);
  }, []);

  return [value, setValueWithCallback];
};

export const handleAuthorizeAccess = (menuId) => {
  const { userAuth } = useAuthStore();
  const authMenus = userAuth?.userData?.user?.menus || [];
  const isAuthorized = authMenus.some((item) => item.menu_id === menuId);

  if (!isAuthorized) return false;

  return true;
};

export const hexToRGBA = (hex, opacity) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const currentHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(currentHex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)},
    ${parseInt(result[3], 16)}, ${opacity})`
    : null;
};

export const numberFormatter = (number) => {
  if (!number) return 0;
  const num = (Number(number) / 1000).toLocaleString('en', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return num;
};

export const formatDate = (
  date,
  format = 'DD/MM/YYYY',
  specificFormat = ''
) => {
  moment.locale('id');
  if (!moment(date, specificFormat).isValid() || !date) {
    return undefined;
  }
  return `${moment(date, specificFormat).format(format)}`;
};

export const toHours = (number, tag = 'hours') => {
  let multiple = 1;
  if (tag === 'days') {
    multiple = 24;
  }
  if (tag === 'weeks') {
    multiple = 24 * 7;
  }

  if (tag === 'months') {
    multiple = 24 * 7 * 4;
  }

  if (tag === 'years') {
    multiple = 24 * 7 * 4 * 12;
  }

  return number * multiple;
};

export const formatRupiah = (nominal, type = 1, withCurrency = true) => {
  const currency = type === 1 ? 'Rp ' : 'Rp. '; // type 3 when no need currency

  if (!nominal || Number.isNaN(nominal)) return `${currency}0`;

  const reverse = nominal.toString().split('').reverse().join('');

  let ribuan = reverse.match(/\d{1,3}/g);
  const format = type === 1 ? '.' : ',';
  if (ribuan) {
    ribuan = ribuan.join(format).split('').reverse().join('');
  } else {
    ribuan = 0;
  }

  return !withCurrency ? ribuan : currency + ribuan;
};

export function timeSince(hours) {
  const seconds = hours * 60 * 60;
  let interval = seconds / 31536000; // years
  if (interval > 1) {
    return `${Math.floor(interval)} Years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} Months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} Days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} Hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} Minutes`;
  }
  return `${Math.floor(seconds)} Seconds`;
}

export const updatePage = (
  currentPage = 1,
  currentLimit = 10,
  newLimit = 10
) => {
  const startIndex = (currentPage - 1) * currentLimit + 1;
  return Math.ceil(startIndex / newLimit);
};

export const formatTime = (date, format = 'HH:mm:ss', specificFormat = '') => {
  moment.locale('id');
  if (!moment(date, specificFormat).isValid() || !date) {
    return undefined;
  }
  return `${moment(date, specificFormat).format(format)}`;
};

export const getFormatFile = (contentType) => {
  let formatFile;
  switch (contentType) {
    case 'application/pdf':
      formatFile = '.pdf';
      break;
    case 'application/vnd.ms-powerpoint':
      formatFile = '.ppt';
      break;
    case 'application/vnd.openxmlformats-officedocument.preplyentationml.preplyentation':
      formatFile = '.pptx';
      break;
    case 'application/vnd.ms-excel':
      formatFile = '.xlsx';
      break;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      formatFile = '.xlsx';
      break;
    case 'text/xlsx':
      formatFile = '.xlsx';
      break;
    case 'application/msword':
      formatFile = '.doc';
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      formatFile = '.docx';
      break;
    case 'application/octet-stream':
      formatFile = '.csv';
      break;
    case 'application/xml':
      formatFile = '.xml';
      break;
    case 'image/gif':
      formatFile = '.gif';
      break;
    case 'image/png':
      formatFile = '.png';
      break;
    case 'image/jpeg':
      formatFile = '.jpeg';
      break;
    case 'image/jpg':
      formatFile = '.jpg';
      break;
    case 'image/svg+xml':
      formatFile = '.svg';
      break;
    case 'application/zip':
      formatFile = '.zip';
      break;
    default:
      formatFile = '.txt';
  }
  return formatFile;
};

export const handleBlobDownload = (blob = new Blob(), filename = String()) => {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  const fileFormat = getFormatFile(get(blob, 'type'));
  const fileName = !isEmpty(filename)
    ? String(filename)
    : moment().format('YYYY-MM-DD HH:mm:ss');
  const fullFileName = fileName.concat(fileFormat);
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.target = '_blank';
  a.download = fullFileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

// initialize react query client to be used in all child services
export const browserHistory = createBrowserHistory();

// initialize query client to be used in all child services
export const reactQueryClient = new QueryClient({
  logger: {
    error: () => {}, // disable log, default is console.error
  },
});

export const formatPriceID = (price, withDot = false) => {
  if (!price) return 'Rp 0';

  return `Rp${withDot ? '.' : ''} ${Number(price).toLocaleString('id')}`;
};

export const DEFAULT_REACT_QUERY_OPTIONS = {
  retry: false,
  refetchOnWindowFocus: false,
};

export const generateRowNumber = (index, page = 1, limit = 10) => {
  return (page - 1) * limit + index + 1;
};

export const getEventType = (event) => {
  if (event && (event.type === 'change' || event.type === 'drop')) {
    return event.type === 'change'
      ? event.target.files[0]
      : event.dataTransfer.files[0];
  }
  return null;
};

export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'FAILED':
      return 'error';
    case 'IN PROGRESS':
      return 'orange';
    case 'AC':
      return 'primary';
    case 'PARTIAL SUCCESS':
      return 'success';
    default:
      return 'neutral90';
  }
};

export const withId = (id, path) => {
  if (id) {
    return `${path}/${id}`;
  }
  return path;
};

export const blobToJson = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
};

export const FILE_FORMAT = {
  'application/pdf': '.pdf',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    '.pptx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '.docx',
  'application/octet-stream': '.jpg',
  'application/xml': '.xml',
  'image/gif': '.gif',
  'image/png': '.png',
  'image/jpeg': '.jpeg',
  'image/jpg': '.jpg',
  'image/svg+xml': '.svg',
};

const hashHelper = (value) => {
  const channelCredentials = `${value}:${value}`;
  const hashedCredentials = crypto
    .createHash('sha256')
    .update(channelCredentials)
    .digest('hex');
  return hashedCredentials;
};

const privateKeyRedis = hashHelper(Config.PRIVATE_KEY_REDIS)
  .toString('hex')
  .slice(0, 32); // 256-bit key
const privateMasterIV = hashHelper(Config.PRIVATE_INIT_VECTOR).slice(0, 12); // 96-bit IV

const generateIV = (username = privateMasterIV) => {
  return hashHelper(username).slice(0, 12); // 96-bit IV;
};

export const decryptGCM = (encryptedText, customeIV) => {
  if (encryptedText === undefined) return '';
  try {
    const InitVector = generateIV(customeIV);
    const encryptedBuffer = Buffer.from(encryptedText, 'base64');
    const tag = encryptedBuffer.slice(encryptedBuffer.length - 16);
    const decipher = crypto.createDecipheriv(
      algorithm,
      privateKeyRedis,
      InitVector
    );
    decipher.setAuthTag(tag);
    const decrypted =
      decipher.update(encryptedBuffer.slice(0, encryptedBuffer.length - 16)) +
      decipher.final();
    return decrypted.toString('utf8');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // TODO replace new module, crypto-browserify contains error in its buffer-xor dependency, failed in importing Buffer constructor from safe-buffer module, thus causing a ReferenceError: Buffer is not defined
    // throw new Error(err);
    return '';
  }
};

export const formatNumber = (num) => {
  // return number and format separetely
  switch (true) {
    case num < 1000:
      return { number: num.toString(), format: '' };
    case num < 1000000:
      return { number: (num / 1000).toFixed(1), format: 'K' };
    case num < 1000000000:
      return { number: (num / 1000000).toFixed(1), format: 'M' };
    case num < 1000000000000:
      return { number: (num / 1000000000).toFixed(1), format: 'B' };
    default:
      return { number: (num / 1000000000000).toFixed(1), format: 'T' };
  }
};

export const monthToNumber = (val) => {
  switch (val) {
    case 'January':
      return '01';
    case 'February':
      return '02';
    case 'March':
      return '03';
    case 'April':
      return '04';
    case 'May':
      return '05';
    case 'June':
      return '06';
    case 'July':
      return '07';
    case 'August':
      return '08';
    case 'September':
      return '09';
    case 'October':
      return '10';
    case 'November':
      return '11';
    case 'December':
      return '12';
    default:
      return '';
  }
};

export const checkBrowser = () => {
  const userAgentString = navigator.userAgent;

  let chromeAgent = userAgentString.indexOf('Chrome') > -1;
  const chromeVersion = chromeAgent
    ? userAgentString
        .substring(userAgentString.indexOf('Chrome') + 7)
        .split(' ')[0]
    : null;

  const firefoxAgent = userAgentString.indexOf('Firefox') > -1;
  const firefoxVersion = firefoxAgent
    ? userAgentString
        .substring(userAgentString.indexOf('Firefox') + 8)
        .split(' ')[0]
    : null;

  const IExplorerAgent =
    userAgentString.indexOf('MSIE') > -1 || userAgentString.indexOf('rv:') > -1;

  let safariAgent = userAgentString.indexOf('Safari') > -1;
  const safariVersion = safariAgent
    ? userAgentString
        .substring(userAgentString.indexOf('Version') + 8)
        .split(' ')[0]
    : null;

  // Discard Safari since it also matches Chrome
  if (chromeAgent && safariAgent) safariAgent = false;

  const operaAgent = userAgentString.indexOf('OP') > -1;
  const operaVersion = operaAgent
    ? userAgentString.substring(userAgentString.indexOf('OP') + 3).split(' ')[0]
    : null;

  if (chromeAgent && operaAgent) chromeAgent = false;

  const edgeAgent =
    userAgentString.indexOf('Chrome') > -1 &&
    userAgentString.indexOf('Edg') > -1;
  const edgeVersion = edgeAgent
    ? userAgentString
        .substring(userAgentString.indexOf('Edg') + 4)
        .split(' ')[0]
    : null;

  let browserName = '';

  if (edgeAgent) {
    browserName = `Microsoft Edge Version ${edgeVersion}`;
  } else if (firefoxAgent) {
    browserName = `Firefox Version ${firefoxVersion}`;
  } else if (IExplorerAgent) {
    browserName = 'Internet Explorer';
  } else if (safariAgent) {
    browserName = `Safari Version ${safariVersion}`;
  } else if (operaAgent) {
    browserName = `Opera Version ${operaVersion}`;
  } else if (chromeAgent) {
    browserName = `Chrome Version ${chromeVersion}`;
  } else {
    browserName = 'Unknown Browser';
  }

  return browserName;
};

export function getCurrentDateTime() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

export const POPUP_TYPE = {
  'popup.ok': 'ok',
  'popup.userManual': 'userManual',
};
