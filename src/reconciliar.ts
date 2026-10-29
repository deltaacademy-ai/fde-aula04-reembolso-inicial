// Resolve um estado DESCONHECIDO perguntando ao sistema pela chave de idempotência.
import { consultarReembolsoPorChave, type Proposta, type Reembolso } from "./api";
import { executarProposta, type ResultadoExecucao } from "./executar";

export type Reconciliacao =
  | { estado: "CONFIRMADO"; reembolso: Reembolso } // a escrita aconteceu; não faça mais nada
  | { estado: "NAO_EXECUTADO" }; // nada foi escrito; retry com a MESMA chave é seguro

export function reconciliar(chave: string): Reconciliacao {
  // Exercício 4: pergunte ao sistema pela chave. Enunciado em exercicios/04-reconciliar.md.
  throw new Error(`Exercício 4: implemente reconciliar (chave ${chave.slice(0, 12)})`);
}

/** Fluxo completo: se deu desconhecido, reconcilia; se nada foi escrito, repete com a mesma chave. */
export function resolverExecucao(proposta: Proposta, resultado: ResultadoExecucao, agora = new Date()): ResultadoExecucao {
  if (resultado.estado !== "DESCONHECIDO") return resultado;
  const r = reconciliar(resultado.chave);
  if (r.estado === "CONFIRMADO") return { estado: "CONFIRMADO", chave: resultado.chave, reembolso: r.reembolso };
  return executarProposta(proposta, agora);
}
