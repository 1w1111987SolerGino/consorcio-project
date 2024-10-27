import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Employee, EmployeePayment, StatusType } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:8063/employees'; // URL de la API para empleados
  private http = inject(HttpClient);
  private selectedEmployee = new BehaviorSubject<Employee | null>(null);
  

  getEmployeesPageable(
    page: number = 0,
    size: number = 10,
    type?: StatusType
  ): Observable<PageResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (type) {
      params = params.set('type', type);
    }
    return this.http.get<PageResponse<Employee>>(`${this.apiUrl}/pageable`, { params });
  }

  // Obtener empleados
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  
  setSelectedEmployee(employee: Employee) {
    this.selectedEmployee.next(employee);
  }
  getSelectedEmployee(): Observable<Employee | null> {
    return this.selectedEmployee.asObservable();
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo empleado
  addEmployee(employee: Employee): Observable<Employee> {
    // Assuming employee.hiringDate is a Date object
    employee.hiringDate.setHours(employee.hiringDate.getHours() + 5);
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Actualizar un empleado existente
  updateEmployee(employee: Employee): Observable<Employee> {
    employee.hiringDate.setHours(employee.hiringDate.getHours() + 5);
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  // Eliminar (o desactivar) un empleado
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener pagos de un empleado
  getEmployeePayments(employeeId: number): Observable<EmployeePayment[]> {
    return this.http.get<EmployeePayment[]>(`${this.apiUrl}/${employeeId}/payments`);
  }

  getEmployee(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+"/"+id);
  }
  checkIfDocumentExists(docNumber: string): Observable<boolean> {
    const filter: { docNumber: string } = { docNumber }; // Crear el filtro necesario
    return this.http.post<Employee[]>(`${this.apiUrl}/search`, filter).pipe(
      map(employees => employees.length > 0) // Verificar si hay empleados
    );
  }

}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}