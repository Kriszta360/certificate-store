import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate, CreateCertificateRequest } from '../models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5173/api/Certificate';

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl);
  }

  addCertificate(certificate: CreateCertificateRequest): Observable<Certificate> {
    return this.http.post<Certificate>(this.apiUrl, certificate);
  }

  updateCertificate(id: string, certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(`${this.apiUrl}/${id}`, certificate);
  }

  deleteCertificate(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}