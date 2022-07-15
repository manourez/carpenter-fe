import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Ceiling,
  CeilingPerf,
  CeilingPerfUpdate,
  CreateCeiling,
  CreatePerf,
  UpdateCeiling,
} from '../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CeilingService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchCeilings() {
    return this.http.get<Ceiling[]>(`${this.baseUrl}/ceiling`);
  }

  fetchPerformances() {
    return this.http.get<CeilingPerf[]>(`${this.baseUrl}/ceiling-perf`);
  }

  getCeiling(id: number) {
    return this.http.get<Ceiling>(`${this.baseUrl}/ceiling/${id}`);
  }

  updateCeiling(id: number, ceiling: UpdateCeiling) {
    return this.http.patch<Ceiling>(`${this.baseUrl}/ceiling/${id}`, ceiling);
  }

  updateCeilingPerformances(id: number, ceilingPerf: CeilingPerfUpdate) {
    return this.http.patch<Ceiling>(
      `${this.baseUrl}/ceiling/update-performances/${id}`,
      ceilingPerf
    );
  }

  addCeiling(ceiling: CreateCeiling) {
    return this.http.post<Ceiling>(`${this.baseUrl}/ceiling`, ceiling);
  }

  addPerformances(performance: CreatePerf) {
    return this.http.post<CeilingPerf>(
      `${this.baseUrl}/ceiling-perf`,
      performance
    );
  }

  deleteCeiling(id: number) {
    return this.http.delete<Ceiling>(`${this.baseUrl}/ceiling/${id}`);
  }

  deletePerformance(id: number) {
    return this.http.delete<CeilingPerf>(`${this.baseUrl}/ceiling-perf/${id}`);
  }
}
