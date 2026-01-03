  import React from "react";
  
  type Comparatif = {
    title: string;
    headers: string[];
    rows: any[][];
  };
  
  interface ClientComparatifBlockProps {
    comparatif: Comparatif;
  }
  
  const ClientComparatifBlock: React.FC<ClientComparatifBlockProps> = ({ comparatif }) => {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-accent)] sm:text-4xl md:text-5xl mb-8">
            {comparatif.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead className="bg-[var(--color-bg-alt)]">
                <tr>
                  {comparatif.headers.map((header: string, idx: number) => (
                    <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-[var(--color-info)] uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[var(--color-bg)] divide-y divide-[var(--color-border)]">
                {comparatif.rows.map((row: any[], idx: number) => (
                  <tr key={idx}>
                    {row.map((cell: any, i: number) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };
  
  export default ClientComparatifBlock;
