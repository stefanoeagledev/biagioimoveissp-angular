// src/app/utils/slugify.ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, ''); // remove all non-alphanumeric except hyphen
}
