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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-lightblue">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-darkblue mb-4 font-googletitre">
            {comparatif.title}
          </h2>
          <p className="text-lg text-regularblue mb-12 font-googletexte">
            Comprendre les différences pour faire le bon choix
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  {comparatif.headers.map((header: string, idx: number) => (
                    <th 
                      key={idx}
                      className={`text-left p-4 font-semibold font-googletitre ${
                        idx === 0 
                          ? 'text-darkblue' 
                          : idx === 1 
                          ? 'text-center text-green-600' 
                          : 'text-center text-regularblue'
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparatif.rows.map((row: any[], rowIdx: number) => (
                  <tr 
                    key={rowIdx} 
                    className="border-b hover:bg-slate-50 transition-colors"
                  >
                    {row.map((cell: any, cellIdx: number) => (
                      <td 
                        key={cellIdx}
                        className={`p-4 font-googletexte ${
                          cellIdx === 0 
                            ? 'font-medium text-darkblue' 
                            : 'text-center text-sm text-gray-700'
                        }`}
                      >
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
