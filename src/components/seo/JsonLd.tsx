/**
 * JSON-LD を <head> 相当に安全に出力する。
 * Metadata API は <script> を出せないため、Server Component として描画する。
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // 構造化データは信頼できる内部生成オブジェクトのみ
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
