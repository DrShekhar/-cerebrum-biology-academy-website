/**
 * Cleanup demo/placeholder study materials before launch.
 *
 * Removes rows that would embarrass a real student:
 *   - materials whose fileUrl points at example.com (demo redirects)
 *   - materials with an empty/missing fileUrl and a TEST-ish title
 *
 * Safe by default: prints what it WOULD do. Pass --apply to actually unpublish.
 * We unpublish (isPublished=false) rather than hard-delete so nothing is lost and
 * any progress/access rows stay referentially intact.
 *
 * Usage:
 *   npx tsx scripts/cleanup-demo-materials.ts           # dry run
 *   npx tsx scripts/cleanup-demo-materials.ts --apply   # unpublish the matches
 */

import { prisma } from '../src/lib/prisma'

async function main() {
  const apply = process.argv.includes('--apply')

  const candidates = await prisma.study_materials.findMany({
    where: {
      OR: [
        { fileUrl: { contains: 'example.com' } },
        { AND: [{ fileUrl: '' }, { title: { contains: 'test', mode: 'insensitive' } }] },
      ],
    },
    select: { id: true, title: true, fileUrl: true, isPublished: true },
  })

  if (candidates.length === 0) {
    console.log('No demo/placeholder materials found. Nothing to do.')
    return
  }

  console.log(`Found ${candidates.length} demo/placeholder material(s):`)
  for (const m of candidates) {
    console.log(
      `  - ${m.id}  "${m.title}"  fileUrl=${JSON.stringify(m.fileUrl)}  published=${m.isPublished}`
    )
  }

  if (!apply) {
    console.log('\nDry run. Re-run with --apply to unpublish these materials.')
    return
  }

  const ids = candidates.map((m) => m.id)
  const result = await prisma.study_materials.updateMany({
    where: { id: { in: ids } },
    data: { isPublished: false },
  })
  console.log(`\nUnpublished ${result.count} material(s).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
