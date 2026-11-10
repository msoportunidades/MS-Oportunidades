import './App.css';

const ETAPAS = [
  { id: 'deteccion', titulo: 'Detección' },
  { id: 'oferta', titulo: 'En Oferta' },
  { id: 'presentada', titulo: 'Presentada' },
  { id: 'evaluacion', titulo: 'En Evaluación' },
  { id: 'adjudicada', titulo: 'Adjudicada' },
  { id: 'perdida', titulo: 'Perdida' },
];

// Datos de ejemplo (basados en licitaciones públicas B2G / SECOP)
const OPORTUNIDADES_EJEMPLO = [
  {
    id: 1,
    nombre: 'Suministro de equipos de cómputo y periféricos',
    institucion: 'Ministerio de Educación Nacional',
    valor_estimado: 450000000,
    fecha_limite: '2026-11-25',
    etapa: 'deteccion',
  },
  {
    id: 2,
    nombre: 'Renovación de licencias de software de seguridad',
    institucion: 'Alcaldía Mayor de Bogotá',
    valor_estimado: 280000000,
    fecha_limite: '2026-11-30',
    etapa: 'deteccion',
  },
  {
    id: 3,
    nombre: 'Consultoría en interoperabilidad de sistemas',
    institucion: 'Gobernación de Antioquia',
    valor_estimado: 620000000,
    fecha_limite: '2026-11-18',
    etapa: 'oferta',
  },
  {
    id: 4,
    nombre: 'Mantenimiento de infraestructura de red y cableado',
    institucion: 'Instituto Nacional de Salud (INS)',
    valor_estimado: 195000000,
    fecha_limite: '2026-11-15',
    etapa: 'presentada',
  },
  {
    id: 5,
    nombre: 'Desarrollo de portal ciudadano y sede electrónica',
    institucion: 'Ministerio de las TIC',
    valor_estimado: 890000000,
    fecha_limite: '2026-11-12',
    etapa: 'evaluacion',
  },
  {
    id: 6,
    nombre: 'Dotación de insumos médicos hospitalarios',
    institucion: 'Hospital Militar Central',
    valor_estimado: 530000000,
    fecha_limite: '2026-10-28',
    etapa: 'adjudicada',
  },
  {
    id: 7,
    nombre: 'Servicio de digitalización y archivo documental',
    institucion: 'Registraduría Nacional del Estado Civil',
    valor_estimado: 310000000,
    fecha_limite: '2026-10-20',
    etapa: 'perdida',
  },
];

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor);
}

function App() {
  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>CRM B2G — Pipeline de Oportunidades</h1>
        <p>Tablero Kanban de licitaciones públicas por etapa</p>
      </header>

      <main className="kanban-board">
        {ETAPAS.map((etapa) => {
          const tarjetas = OPORTUNIDADES_EJEMPLO.filter(
            (op) => op.etapa === etapa.id
          );

          return (
            <section key={etapa.id} className={`kanban-column col-${etapa.id}`}>
              <div className="kanban-column-header">
                <h2>{etapa.titulo}</h2>
                <span className="badge-count">{tarjetas.length}</span>
              </div>

              <div className="kanban-cards">
                {tarjetas.map((op) => (
                  <article key={op.id} className="kanban-card">
                    <h3 className="card-title">{op.nombre}</h3>
                    <p className="card-institucion">{op.institucion}</p>
                    <div className="card-meta">
                      <span className="card-valor">
                        {formatearMoneda(op.valor_estimado)}
                      </span>
                      <span className="card-fecha">
                        Vence: {op.fecha_limite}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;