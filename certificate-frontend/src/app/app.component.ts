import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Certificate, CreateCertificateRequest } from './models/certificate';
import { CertificateService } from './services/certificate.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Certificate Store';

  certificates: Certificate[] = [];

  newCertificate: CreateCertificateRequest = {
    id: '',
    ownerName: '',
    email: '',
    type: '',
    status: 'Active',
    createdAt: '',
    validUntil: ''
  };

  editingCertificate: Certificate | null = null;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificateService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
      },
      error: (error) => {
        console.error('Hiba a tanúsítványok lekérésekor:', error);
      }
    });
  }

  addCertificate(): void {
    const now = new Date().toISOString();

    const certificateToSend: CreateCertificateRequest = {
      id: this.newCertificate.id.trim(),
      ownerName: this.newCertificate.ownerName.trim(),
      email: this.newCertificate.email.trim(),
      type: this.newCertificate.type.trim(),
      status: this.newCertificate.status.trim(),
      createdAt: this.newCertificate.createdAt || now,
      validUntil: this.newCertificate.validUntil
    };

    if (
      !certificateToSend.id ||
      !certificateToSend.ownerName ||
      !certificateToSend.email ||
      !certificateToSend.type ||
      !certificateToSend.status ||
      !certificateToSend.validUntil
    ) {
      alert('Kérlek tölts ki minden mezőt.');
      return;
    }

    this.certificateService.addCertificate(certificateToSend).subscribe({
      next: (createdCertificate) => {
        this.certificates = [...this.certificates, createdCertificate];

        this.newCertificate = {
          id: '',
          ownerName: '',
          email: '',
          type: '',
          status: 'Active',
          createdAt: '',
          validUntil: ''
        };

        alert('Certificate sikeresen létrehozva.');
      },
      error: (error) => {
        console.error('Hiba a mentés során:', error);
        alert('Hiba történt a certificate mentésekor.');
      }
    });
  }

  startEdit(certificate: Certificate): void {
    this.editingCertificate = {
      ...certificate
    };
  }

  cancelEdit(): void {
    this.editingCertificate = null;
  }

  updateCertificate(): void {
    if (!this.editingCertificate) {
      return;
    }

    const certificateToUpdate: Certificate = {
      id: this.editingCertificate.id.trim(),
      ownerName: this.editingCertificate.ownerName.trim(),
      email: this.editingCertificate.email.trim(),
      type: this.editingCertificate.type.trim(),
      status: this.editingCertificate.status.trim(),
      createdAt: this.editingCertificate.createdAt,
      validUntil: this.editingCertificate.validUntil
    };

    if (
      !certificateToUpdate.id ||
      !certificateToUpdate.ownerName ||
      !certificateToUpdate.email ||
      !certificateToUpdate.type ||
      !certificateToUpdate.status ||
      !certificateToUpdate.validUntil
    ) {
      alert('Kérlek tölts ki minden mezőt a módosításhoz.');
      return;
    }

    this.certificateService.updateCertificate(certificateToUpdate.id, certificateToUpdate).subscribe({
      next: (updatedCertificate) => {
        this.certificates = this.certificates.map(certificate =>
          certificate.id === updatedCertificate.id ? updatedCertificate : certificate
        );

        this.editingCertificate = null;

        alert('Certificate sikeresen módosítva.');
      },
      error: (error) => {
        console.error('Hiba a módosítás során:', error);
        alert('Hiba történt a certificate módosításakor.');
      }
    });
  }

  deleteCertificate(id: string): void {
    const confirmed = confirm(`Biztosan törölni szeretnéd ezt a certificate-et? ID: ${id}`);

    if (!confirmed) {
      return;
    }

    this.certificateService.deleteCertificate(id).subscribe({
      next: () => {
        this.certificates = this.certificates.filter(certificate => certificate.id !== id);

        if (this.editingCertificate && this.editingCertificate.id === id) {
          this.editingCertificate = null;
        }

        alert('Certificate sikeresen törölve.');
      },
      error: (error) => {
        console.error('Hiba a törlés során:', error);
        alert('Hiba történt a certificate törlésekor.');
      }
    });
  }
}