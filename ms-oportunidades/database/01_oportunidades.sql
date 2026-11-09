-- MS-Oportunidades: tabla oportunidades
-- Script idempotente: se puede ejecutar varias veces.

CREATE TABLE IF NOT EXISTS oportunidades (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Datos obligatorios (HU-01)
    nombre               VARCHAR(255)  NOT NULL,
    institucion_id       VARCHAR(100)  NOT NULL,  -- id en MS-Instituciones (sin FK: es otro servicio)
    valor_estimado       NUMERIC(18,2) NOT NULL CHECK (valor_estimado >= 0),
    fecha_limite_oferta  DATE          NOT NULL,
    responsable_id       VARCHAR(100)  NOT NULL,  -- id del usuario (viene del JWT)

    -- Datos opcionales
    descripcion          TEXT,
    numero_proceso       VARCHAR(100),            -- n.º de proceso en SECOP u otro portal

    -- Pipeline (HU-02)
    etapa                VARCHAR(20)   NOT NULL DEFAULT 'deteccion'
        CONSTRAINT chk_etapa CHECK (etapa IN
            ('deteccion','oferta','presentada','evaluacion','adjudicada','perdida')),

    -- Datos de cierre
    valor_adjudicado     NUMERIC(18,2) CHECK (valor_adjudicado >= 0),
    fecha_cierre         DATE,
    motivo_perdida       TEXT,

    -- Control de concurrencia optimista (Informe, sec. 4.2)
    version              INTEGER       NOT NULL DEFAULT 1,

    created_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    -- Reglas de cierre
    CONSTRAINT chk_cierre_adjudicada CHECK (
        etapa <> 'adjudicada' OR (valor_adjudicado IS NOT NULL AND fecha_cierre IS NOT NULL)
    ),
    CONSTRAINT chk_cierre_perdida CHECK (
        etapa <> 'perdida' OR motivo_perdida IS NOT NULL
    )
);

-- Índices para los filtros del listado
CREATE INDEX IF NOT EXISTS idx_oportunidades_etapa        ON oportunidades (etapa);
CREATE INDEX IF NOT EXISTS idx_oportunidades_institucion  ON oportunidades (institucion_id);
CREATE INDEX IF NOT EXISTS idx_oportunidades_responsable  ON oportunidades (responsable_id);
CREATE INDEX IF NOT EXISTS idx_oportunidades_fecha_limite ON oportunidades (fecha_limite_oferta);