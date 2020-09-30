export type PaymentStatusType = "finished" | "pending" | "error";

export const searchCompany = (searchQuery: string) => {
  const reversed = (word: string) =>
    [...word.split("")].reduceRight((p, c) => p + c);

  return {
    numCompanies: 24,
    companies: [
      {
        name: `${searchQuery} 株式会社`,
        id: "98ccc4e5-e0b4-4fec-9767-145eec608bb2",
      },
      {
        name: `株式会社 ${searchQuery}${searchQuery}`,
        id: "7b699659-1e0d-41a1-8c73-d9e34d428acf",
      },
      {
        name: `合名会社 ${searchQuery}★＆${searchQuery}☆`,
        id: "c3a1dc79-caef-4bac-bef4-6a7be36fe75c",
      },
      {
        name: `${searchQuery}は${searchQuery}を救う`,
        id: "2e259fd1-b43d-4dbb-96ac-b8664cc26f23",
      },
      {
        name: `${searchQuery}${reversed(searchQuery)}出版`,
        id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
      },
    ],
  };
};

export const searchMoreCompany = (searchQuery: string, offset: number) => {
  return [
    {
      name: `${searchQuery}スーパー${offset + 1}`,
      id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
    },
    {
      name: `${searchQuery}スーパー${offset + 2}`,
      id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
    },
    {
      name: `${searchQuery}スーパー${offset + 3}`,
      id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
    },
    {
      name: `${searchQuery}スーパー${offset + 4}`,
      id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
    },
    {
      name: `${searchQuery}スーパー${offset + 5}`,
      id: "bd4828a5-e259-43ae-981a-23f53484f4b0",
    },
  ];
};

export const getCompanyDetail = (id: string) => {
  return {
    name: "Hoge 株式会社",
    id: id,
    workersRegistered: 12,
    workers: [
      {
        id: "45bc28ee-1776-44af-bc07-9314ce22a909",
        jobName: "サーバーサイドエンジニア",
        verified: false,
        comment:
          "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
      },
      {
        id: "45bc28ee-1776-44af-bc07-9314ce22a909",
        jobName: "iOSエンジニア",
        verified: true,
        comment:
          "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
      },
      {
        id: "45bc28ee-1776-44af-bc07-9314ce22a909",
        jobName: "フロントエンドエンジニア",
        verified: true,
        comment:
          "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
      },
      {
        id: "45bc28ee-1776-44af-bc07-9314ce22a909",
        jobName: "インフラエンジニア",
        verified: true,
        comment:
          "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
      },
      {
        id: "45bc28ee-1776-44af-bc07-9314ce22a909",
        jobName: "研究開発職",
        verified: false,
        comment:
          "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
      },
    ],
  };
};

export const getMoreWorkers = (companyId: string, offset: number) => {
  return [
    {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "サーバーサイドエンジニア",
      verified: false,
      comment:
        "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    },
    {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "iOSエンジニア",
      verified: true,
      comment:
        "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    },
    {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "フロントエンドエンジニア",
      verified: true,
      comment:
        "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    },
    {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "インフラエンジニア",
      verified: true,
      comment:
        "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    },
    {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "研究開発職",
      verified: false,
      comment:
        "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    },
  ];
};

export const getUpcomingEvents = () => [
  {
    startDate: new Date("2020-09-26 12:00:00"),
    endDate: new Date("2020-09-26 13:00:00"),
    companyName: "Sansan株式会社",
    matchingId: "4c2ce54d-5a53-46e9-ae8b-7ca4bacab6a5",
    payment: {
      status: "finished" as PaymentStatusType,
      amount: 1000,
      date: new Date("2020-09-23 23:31:12"),
      dueDate: null,
    },
  },
  {
    startDate: new Date("2020-09-29 18:00:00"),
    endDate: new Date("2020-09-29 19:00:00"),
    matchingId: "0c853551-193d-437c-8b53-c266963d9102",
    companyName: "ClipLine株式会社",
    payment: {
      status: "pending" as PaymentStatusType,
      amount: 1000,
      date: null,
      dueDate: new Date("2020-09-26 18:00:00"),
    },
  },
];

export const getRecentPayments = () => [
  {
    date: new Date("2020-09-23 23:31:12"),
    companyName: "Sansan株式会社",
    matchingId: "4c2ce54d-5a53-46e9-ae8b-7ca4bacab6a5",
    status: "finished" as PaymentStatusType,
    amount: 1000,
    dueDate: null,
  },
  {
    date: new Date("2020-09-07 11:24:41"),
    companyName: "ビズリーチ株式会社",
    matchingId: "a8735832-c63b-4b9a-a050-a7309866af42",
    status: "finished" as PaymentStatusType,
    amount: 1000,
    dueDate: null,
  },
  {
    date: new Date("2020-08-23 14:25:30"),
    companyName: "freee株式会社",
    matchingId: "6b12fb3e-296f-4384-ba19-b15a7c7134fc",
    status: "finished" as PaymentStatusType,
    amount: 1000,
    dueDate: null,
  },
];

export const getWorkerDetail = (id: string) => {
  return {
    id,
    jobName: "サーバーサイドエンジニア",
    companyName: "Sansan株式会社",
    verified: true,
    comment:
      "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  };
};

export const createNewMatching = (inquiry: string, workerId: string) => {
  return {
    id: "5a8ad977-526e-4e88-bc92-e52bb698fc5b",
    startDate: null,
    endDate: null,
    inquiry,
    worker: {
      id: workerId,
      companyName: "ClipLine株式会社",
    },
    payment: {
      status: "pending" as PaymentStatusType,
      amount: 1000,
      date: null,
      dueDate: null,
    },
  };
};

export const getMatchingDetail = (id: string) => {
  return {
    id,
    startDate: null as Date | null,
    endDate: null as Date | null,
    inquiry: "実際の待遇について聞きたい。",
    chatRoomId: "8edc3069-d956-4a4d-a017-69e011e8d90e",
    listener: {
      id: "42d5a38e-fd54-4ee5-8944-86e7f74e8893",
    },
    speaker: {
      id: "6924e1b2-b197-4fb6-bb78-22f904b801d4",
      companyName: "ClipLine株式会社",
      jobName: "サーバーサイドエンジニア",
      verified: true,
    },
    payment: {
      status: "pending" as PaymentStatusType,
      amount: 1000,
      date: null as Date | null,
      dueDate: null as Date | null,
    },
  };
};

export const getMessages = (roomId: string) => {
  return [
    {
      id: "172c4f63-b3c7-4b27-bf72-54254d054b1f",
      text: "はじめまして",
      writer: "42d5a38e-fd54-4ee5-8944-86e7f74e8893",
      dateSent: new Date("2020-08-23 14:25:30"),
    },
    {
      id: "6c69334c-8126-4802-846d-1b17b2bebfa0",
      text: "日程いつにしますか？",
      writer: "42d5a38e-fd54-4ee5-8944-86e7f74e8893",
      dateSent: new Date("2020-08-23 14:25:39"),
    },
    {
      id: "6c69334c-8126-4802-846d-1b17b2bebfa0",
      text:
        "明日の夜はどうでしょうか？というのも私にも〇〇という都合があって、明後日以降は非常に忙しくなるんです。",
      writer: "6924e1b2-b197-4fb6-bb78-22f904b801d4",
      dateSent: new Date("2020-08-23 14:27:18"),
    },
    {
      id: "be4c2674-08b0-4655-8a5b-7f7354ea0c32",
      text: "良いですね",
      writer: "42d5a38e-fd54-4ee5-8944-86e7f74e8893",
      dateSent: new Date("2020-08-23 14:30:51"),
    },
  ];
};

export const sendMessage = (roomId: string, text: string) => {
  return {
    id: "be4c2674-08b0-4655-8a5b-7f7354ea0c32",
    text,
    writer: "42d5a38e-fd54-4ee5-8944-86e7f74e8893",
    dateSent: new Date("2020-08-23 14:30:51"),
  };
};
