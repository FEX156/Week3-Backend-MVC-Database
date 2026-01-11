export interface Contact {
  id: number;
  nama: string;
  phone_number: string;
  company: string;
  email: string;
}

export interface Groups {
  id: number;
  group_name: string;
}

export interface ContactGroups {
  id: number;
  contact_id: string;
  group_id: number;
}

export interface ModelResponses<Tpayload> {
  success: boolean;
  message: string;
  payload?: Tpayload;
}

/*
====================
ADDRESS BOOK COMMAND
====================

> node main.js create Contact <name> <phoneNumber> <company> <email>
> node main.js update Contact <id> <name> <phoneNumber> <company> <email>
> node main.js delete Contact <id>
> node main.js showContact
> node main.js create Groups <groupName>
> node main.js update Groups <id> <groupName>
> node main.js delete Groups <id>
> node main.js showGroups
> node main.js create ContactGroups <contactId> <groupId>
> node main.js update ContactGroups <id> <contactId> <groupId>
> node main.js delete ContactGroups <id> 
> node main.js help

*/
