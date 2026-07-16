const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(path: string) {
  return `${publicBasePath}${path}`;
}
