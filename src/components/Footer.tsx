export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="container-custom py-12">
        <div className="text-center text-xs text-ink-500 space-y-3">
          <p>{new Date().getFullYear()} 國立臺北藝術大學 學務處生活輔導組 © 版權所有</p>
          <p>導師業務專線（02）2896-1000分機1312    編輯：國立臺北藝術大學學務處生活輔導組</p>
        </div>
      </div>
    </footer>
  )
}
