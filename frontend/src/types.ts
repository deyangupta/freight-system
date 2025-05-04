export interface ShipmentData {
    origin: string;
    destination: string;
    shipper: string;
    agent: string;
    pod: string;
    gp20: string;
    gp40: string;
    rate: string;
    carrier: string;
    type: string;
    remark1?: string;
    remark2?: string;
    remark3?: string;
    transit_time?: string;
}