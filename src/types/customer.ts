export type Customer = {
    id: number;
    name: string;
    companyId: string | null;
    countryId: number;
    countryCode: string;
    city: string;
    postalCode: string;
    registered: boolean;
}

export type CustomerContact = {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    primary: boolean;
}

export type CustomerDetail = {
    id: number;
    name: string;
    companyId: string | null;
    countryId: number;
    countryCode: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
    registered: boolean;
    contacts: CustomerContact[];
}

export type CreateCustomerDto = {
    name: string;
    companyId: string | null;
    countryId: number;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
    registered: boolean;
}

export type CustomerContactCrudDto = {
    name: string;
    phoneNumber: string;
    email: string;
    primary: boolean;
}