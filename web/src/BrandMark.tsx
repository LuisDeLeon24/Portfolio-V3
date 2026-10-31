/** Firma: itálica didona, tilde de León en naranja, filete dorado solo bajo «De León». */
export function Signature() {
  return (
    <p className="signature" aria-hidden="true">
      <span className="signature-given">Luis </span>
      <span className="signature-family">
        De Le
        <span className="signature-o">
          o<span className="signature-tilde">´</span>
        </span>
        n
        <span className="signature-filete" />
      </span>
    </p>
  )
}

/** Monograma LDL: foto de perfil, favicon y cabecera, cuando la firma no cabe. */
export function Monogram() {
  return (
    <span className="monogram" aria-hidden="true">
      <span className="monogram-spark" />
      <span className="monogram-letters">LDL</span>
    </span>
  )
}
