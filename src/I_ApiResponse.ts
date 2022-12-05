export interface IAPIResponse {
    new_members:     NewMember[];
    updated_members: any[];
    errors:          any[];
    total_created:   number;
    total_updated:   number;
    error_count:     number;
    _links:          Link[];
}

export interface Link {
    rel:           string;
    href:          string;
    method:        string;
    targetSchema?: string;
    schema?:       string;
}

export interface NewMember {
    id:               string;
    email_address:    string;
    unique_email_id:  string;
    email_type:       string;
    status:           string;
    merge_fields:     null[];
    stats:            null[];
    ip_signup:        string;
    timestamp_signup: string;
    ip_opt:           string;
    timestamp_opt:    Date;
    member_rating:    number;
    last_changed:     Date;
    language:         string;
    vip:              boolean;
    email_client:     string;
    location:         null[];
    tags_count:       number;
    tags:             any[];
    list_id:          string;
    _links:           null[];
}
