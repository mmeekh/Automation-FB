import { BuilderRoot } from '@/components/automation-builder/BuilderRoot';

type SearchParams = Record<string, string | string[] | undefined>;

const pickFirst = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default function BuilderPage({
  searchParams = {},
}: {
  searchParams?: SearchParams;
}) {
  const template =
    pickFirst(searchParams.template) ??
    pickFirst(searchParams.flow) ??
    pickFirst(searchParams.automation);

  const viewParam = pickFirst(searchParams.view);
  const initialView = viewParam === 'analytics' ? 'analytics' : undefined;

  return <BuilderRoot initialTemplateId={template} initialView={initialView} />;
}

