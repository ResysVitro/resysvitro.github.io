import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'public/articles/seasons')
const workshopsDirectory = path.join(process.cwd(), 'public/articles/workshops')
const newsDirectory = path.join(process.cwd(), 'public/articles/news')

export interface ArticleMetadata {
  id: string
  title: string
  year: number
  date: string
  author?: string
  tags?: string[]
  thumbnail?: string
  poster?: string
}

export interface Article extends ArticleMetadata {
  content: string
}

export interface WorkshopMetadata {
  id: string
  title: string
  semester: string
  date: string
  orientation: 'portrait' | 'landscape'
  tags?: string[]
  thumbnail?: string
  poster?: string
  registrationUrl?: string
}

export interface Workshop extends WorkshopMetadata {
  content: string
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      id: data.id || slug,
      title: data.title,
      year: data.year,
      date: data.date,
      author: data.author,
      tags: data.tags,
      thumbnail: data.thumbnail,
      poster: data.poster,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error)
    return null
  }
}

export function getAllArticles(): ArticleMetadata[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(articlesDirectory)
    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(articlesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          id: data.id || slug,
          title: data.title || 'Untitled',
          year: data.year || new Date().getFullYear(),
          date: data.date || new Date().toISOString(),
          author: data.author,
          tags: data.tags || [],
          thumbnail: data.thumbnail,
          poster: data.poster,
        }
      })
      .filter((article) => article.title && article.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
  } catch (error) {
    console.error('Error loading articles:', error)
    return []
  }
}

export async function getWorkshopBySlug(slug: string): Promise<Workshop | null> {
  try {
    const fullPath = path.join(workshopsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      id: data.id || slug,
      title: data.title,
      semester: data.semester,
      date: data.date,
      orientation: data.orientation || 'portrait',
      tags: data.tags,
      thumbnail: data.thumbnail,
      poster: data.poster,
      registrationUrl: data.registrationUrl,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error loading workshop ${slug}:`, error)
    return null
  }
}

export function getAllWorkshops(): WorkshopMetadata[] {
  try {
    if (!fs.existsSync(workshopsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(workshopsDirectory)
    const workshops = fileNames
      .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(workshopsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          id: data.id || slug,
          title: data.title || 'Untitled',
          semester: data.semester || '',
          date: data.date || new Date().toISOString(),
          orientation: data.orientation || 'portrait',
          tags: data.tags || [],
          thumbnail: data.thumbnail,
          poster: data.poster,
          registrationUrl: data.registrationUrl,
        }
      })
      .filter((workshop) => workshop.title && workshop.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return workshops
  } catch (error) {
    console.error('Error loading workshops:', error)
    return []
  }
}

export interface NewsMetadata {
  id: string
  title: string
  date: string
  category?: string
}

export interface News extends NewsMetadata {
  content: string
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    if (!fs.existsSync(newsDirectory)) {
      return null
    }

    // First, try to find the file by slug (filename)
    let fullPath = path.join(newsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      // If not found by filename, search all files by id
      const fileNames = fs.readdirSync(newsDirectory)
      const matchingFile = fileNames.find((fileName) => {
        if (!fileName.endsWith('.md') || fileName === 'README.md') {
          return false
        }
        const filePath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        return data.id === slug
      })

      if (!matchingFile) {
        return null
      }
      fullPath = path.join(newsDirectory, matchingFile)
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      id: data.id || slug,
      title: data.title,
      date: data.date,
      category: data.category,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error loading news ${slug}:`, error)
    return null
  }
}

export function getAllNews(): NewsMetadata[] {
  try {
    if (!fs.existsSync(newsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(newsDirectory)
    const news = fileNames
      .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          id: data.id || slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          category: data.category,
        }
      })
      .filter((news) => news.title && news.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return news
  } catch (error) {
    console.error('Error loading news:', error)
    return []
  }
}
