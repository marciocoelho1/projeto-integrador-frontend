import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type StatusTreinamento = 'ATIVO' | 'INATIVO';

export interface Treinamento {
  id: number;
  codigo: string;
  nome: string;
  classificacao: string | null;
  nr: string | null;
  cargaHoraria: string;
  validadeMeses: number;
  status: StatusTreinamento;
}

export interface TreinamentoRequest {
  codigo: string;
  nome: string;
  classificacao?: string;
  nr?: string;
  cargaHoraria: string;
  validadeMeses: number;
  status: StatusTreinamento;
}

@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/treinamentos';

  listar(): Observable<Treinamento[]> {
    return this.http.get<Treinamento[]>(
      this.apiUrl
    );
  }

  buscar(id: number): Observable<Treinamento> {
    return this.http.get<Treinamento>(
      `${this.apiUrl}/${id}`
    );
  }

  cadastrar(
    dados: TreinamentoRequest
  ): Observable<Treinamento> {
    return this.http.post<Treinamento>(
      this.apiUrl,
      dados
    );
  }

  atualizar(
    id: number,
    dados: TreinamentoRequest
  ): Observable<Treinamento> {
    return this.http.put<Treinamento>(
      `${this.apiUrl}/${id}`,
      dados
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
