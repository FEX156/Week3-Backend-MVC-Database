export type Contact = {
  contact_id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  groups: string[];
};

export type Group = {
  group_id: number;
  group_name: string;
};

export type ContactGroup = {
  contact_group_id: number;
  contact_id: number;
  group_id: number;
};

export type ContactDTO = {
  contact_id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  groups: string[];
};

export type GroupDTO = {
  group_id: number;
  group_name: string;
};

export type ContactGroupDTO = {
  contact_group_id: number;
  contact_id: number;
  group_id: number;
};

export type AppResponse<T> =
  | {
      success: true;
      message: string;
      data?: T;
    }
  | {
      success: false;
      message: string;
      error?: unknown;
    };
