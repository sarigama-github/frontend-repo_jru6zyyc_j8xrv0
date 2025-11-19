import { motion, useScroll, useTransform } from 'framer-motion'

export default function Sections() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800, 1600], [0, -40, -80])

  const items = [
    {
      title: 'Sensitive ≠ Weak',
      body: 'Your empathy is a strategic superpower. Together we turn your intuition into influence, your care into clear boundaries, and your gifts into outcomes.'
    },
    {
      title: 'Learning that Feels Safe',
      body: 'Micro-lessons, reflection prompts, and community practice — all designed to energize, not drain.'
    },
    {
      title: 'Success, Soft and Strong',
      body: 'We blend nervous-system-friendly habits with practical execution so you grow with steadiness and joy.'
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 text-white">
      <motion.div style={{ y }} className="relative max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold text-teal-200">{it.title}</h3>
            <p className="mt-2 text-teal-100/90">{it.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
