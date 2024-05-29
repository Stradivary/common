import React from 'react';
import { Kanban } from '../components';

const opportunity = [
  {
    salesStage: 'Initial Communication',
    totalOppty: '1',
    totalSalesRevenue: '12000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
    ],
  },
  {
    salesStage: 'Proposal',
    totalOppty: '0',
    totalSalesRevenue: '0',
    opportunity: [],
  },
  {
    salesStage: 'Negotiation',
    totalOppty: '5',
    totalSalesRevenue: '60000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
    ],
  },
  {
    salesStage: 'POC',
    totalOppty: '5',
    totalSalesRevenue: '60000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
    ],
  },
  {
    salesStage: 'Sign Agreement',
    totalOppty: '2',
    totalSalesRevenue: '12000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '6000000',
      },
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '6000000',
      },
    ],
  },
  {
    salesStage: 'Closed Won',
    totalOppty: '1',
    totalSalesRevenue: '12000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
    ],
  },
  {
    salesStage: 'Closed Hold',
    totalOppty: '1',
    totalSalesRevenue: '12000000',
    opportunity: [
      {
        opportunityId: '1-HXGHRS',
        opportunityName: 'Test B2B Test Title Card Kanban',
        accountManagerName: 'Lukman Hakim',
        salesTeam: 'Bank BCA Tabungan Rakyat Indonesia',
        companyName: 'FUT Readiness',
        salesRevenue: '12000000',
      },
    ],
  },
  {
    salesStage: 'Closed Lost',
    totalOppty: '0',
    totalSalesRevenue: '0',
    opportunity: [],
  },
];

const headerData = opportunity.map((item) => {
  return {
    stage: item?.salesStage,
    totalData: item?.totalOppty,
    totalAmount: Number(item?.totalSalesRevenue),
  };
});

const cardData = [];
const data = opportunity.map((item) => {
  item.opportunity?.map((oppty) => {
    const tempData = {
      stage: item.salesStage,
      idCard: oppty.opportunityId,
      title: oppty.opportunityName,
      title2: oppty.accountManagerName,
      amount: Number(oppty.salesRevenue),
      description: oppty.salesTeam,
      step: [
        {
          id: oppty.opportunityId,
          icon: 'DocumentAgreement',
          text: oppty.companyName,
        },
      ],
    };
    return cardData.push(tempData);
  });
  return data;
});

export default {
  default: (
    <Kanban
      style={{ padding: '2rem', margin: '2rem' }}
      headerData={headerData}
      cardData={cardData}
    />
  ),
};
