const statusArray = [
  { key: "I", label: "Incluido" },
  { key: "A", label: "Ativo" },
  { key: "SA", label: "Solicitou alteração" },
  { key: "AL", label: "Alterado" },
  { key: "SE", label: "Solicitou exclusão" },
  { key: "E", label: "Excluido" },
  { key: "SR", label: "Soliticitou reativação" },
];
const updateStatus = (status: string) => {
  return statusArray.find((s) => s.key === status)?.label;
};

export default updateStatus;
