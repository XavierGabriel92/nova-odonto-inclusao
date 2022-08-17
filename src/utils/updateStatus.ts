const statusArray = [
  { key: "I", label: "Incluído" },
  { key: "A", label: "Ativo" },
  { key: "SA", label: "Solicitou alteração" },
  { key: "AL", label: "Alterado" },
  { key: "SE", label: "Solicitou exclusão" },
  { key: "E", label: "Excluído" },
  { key: "SR", label: "Soliticitou reativação" },
];
const updateStatus = (status: string) => {
  return statusArray.find((s) => s.key === status)?.label;
};

export default updateStatus;
