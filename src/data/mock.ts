import { Contact, Status } from "@prisma/client";

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
