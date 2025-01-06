// This file is auto-generated by @hey-api/openapi-ts

export const AmpasDailySummarySchema = {
  type: "object",
  properties: {
    totalTaken: {
      type: "integer",
      format: "int32",
    },
    totalTakenPrice: {
      type: "number",
      format: "double",
    },
    userTakenCount: {
      type: "array",
      items: {
        $ref: "#/components/schemas/StringInt32KeyValuePair",
      },
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;

export const AmpasModelSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int32",
    },
    userId: {
      type: "integer",
      format: "int32",
    },
    productionDate: {
      type: "string",
      format: "date-time",
    },
    takenTime: {
      type: "string",
      format: "date-time",
    },
    price: {
      type: "number",
      format: "double",
    },
    amount: {
      type: "integer",
      format: "int32",
    },
    description: {
      type: "string",
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;

export const CampaignModelSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int32",
    },
    type: {
      type: "string",
      nullable: true,
    },
    title: {
      type: "string",
      nullable: true,
    },
    description: {
      type: "string",
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;

export const RoleSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int32",
    },
    name: {
      type: "string",
      nullable: true,
    },
    normalizedName: {
      type: "string",
      nullable: true,
    },
    concurrencyStamp: {
      type: "string",
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;

export const StringInt32KeyValuePairSchema = {
  type: "object",
  properties: {
    key: {
      type: "string",
      nullable: true,
    },
    value: {
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
} as const;

export const UserSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int32",
    },
    userName: {
      type: "string",
      nullable: true,
    },
    normalizedUserName: {
      type: "string",
      nullable: true,
    },
    email: {
      type: "string",
      nullable: true,
    },
    normalizedEmail: {
      type: "string",
      nullable: true,
    },
    emailConfirmed: {
      type: "boolean",
    },
    passwordHash: {
      type: "string",
      nullable: true,
    },
    securityStamp: {
      type: "string",
      nullable: true,
    },
    concurrencyStamp: {
      type: "string",
      nullable: true,
    },
    phoneNumber: {
      type: "string",
      nullable: true,
    },
    phoneNumberConfirmed: {
      type: "boolean",
    },
    twoFactorEnabled: {
      type: "boolean",
    },
    lockoutEnd: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
    lockoutEnabled: {
      type: "boolean",
    },
    accessFailedCount: {
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
} as const;