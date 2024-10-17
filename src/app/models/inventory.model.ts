// Agregar nuevo modelo para las transacciones
export interface Transaction {
  id?: number;
  inventory_id: number; // Relación con el inventario
  quantity: number; // Cantidad de la transacción
  price?: number; // Precio, puede ser null
  transaction_date?: string; // Fecha de la transacción (será manejada por el backend)
  transaction_type: TransactionType; // Tipo de transacción (ingreso o egreso)
}

export enum StatusType {
  ACTIVE = 'Active', // Activo
  INACTIVE = 'Inactive' // Inactivo
}

export enum TransactionType {
  ENTRY = 'ENTRY', // Ingreso de inventario
  OUTPUT = 'OUTPUT' // Egreso de inventario
}

export interface Inventory {
  id?: number;
  article_id: number; // Relación con el ítem
  stock: number;
  min_stock?: number; // Puede ser null
  inventory_status: StatusType; // Baja lógica
}
