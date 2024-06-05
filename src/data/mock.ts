import { Contact, Status, Media, MediaType } from "@prisma/client";

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    message: "I'm interested in your design work for my upcoming project.",
    status: Status.PENDING,
    createdAt: new Date("2024-06-01T09:00:00"),
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    message: "Can we discuss your rates for freelance development?",
    status: Status.RESPONDED,
    createdAt: new Date("2024-06-01T10:00:00"),
  },
  {
    id: "3",
    firstName: "Carol",
    lastName: "Taylor",
    email: "carol.taylor@example.com",
    message:
      "Your portfolio is impressive! Are you available for a consultation next week?",
    status: Status.PENDING,
    createdAt: new Date("2024-06-01T11:00:00"),
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    message:
      "I have a few questions about the technologies you use in your projects.",
    status: Status.RESPONDED,
    createdAt: new Date("2024-06-02T09:00:00"),
  },
  {
    id: "5",
    firstName: "Eve",
    lastName: "Davis",
    email: "eve.davis@example.com",
    message: "Could you provide more examples of your previous work?",
    status: Status.PENDING,
    createdAt: new Date("2024-06-02T10:00:00"),
  },
  {
    id: "6",
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@example.com",
    message: "Are you open to collaborations with other creatives?",
    status: Status.PENDING,
    createdAt: new Date("2024-06-02T11:00:00"),
  },
  {
    id: "7",
    firstName: "Grace",
    lastName: "Wilson",
    email: "grace.wilson@example.com",
    message:
      "I saw your presentation at the conference. Could we discuss potential partnership opportunities?",
    status: Status.PENDING,
    createdAt: new Date("2024-06-03T09:00:00"),
  },
];

export const MOCK_PDF_FILES: Media[] = [
  {
    id: "1",
    name: "Annual Report 2023",
    url: "https://example.com/annual-report-2023.pdf",
    fileKey: "2023-annual-report",
    createdAt: new Date("2023-01-05T14:48:00.000Z"),
    mediaType: MediaType.PDF,
  },
  {
    id: "2",
    name: "User Guide",
    url: "https://example.com/user-guide.pdf",
    fileKey: "user-guide",
    createdAt: new Date("2023-03-12T09:22:00.000Z"),
    mediaType: MediaType.PDF,
  },
  {
    id: "3",
    name: "Financial Analysis Q2",
    url: "https://example.com/financial-analysis-q2.pdf",
    fileKey: "financial-analysis-q2",
    createdAt: new Date("2023-04-15T11:30:00.000Z"),
    mediaType: MediaType.PDF,
  },
  {
    id: "4",
    name: "Project Proposal",
    url: "https://example.com/project-proposal.pdf",
    fileKey: "project-proposal",
    createdAt: new Date("2023-05-20T16:45:00.000Z"),
    mediaType: MediaType.PDF,
  },
];
