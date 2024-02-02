export default async function searchBooks(type, query, sort, page) {
  const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(
    query
  )}&fields=key,title,author_name,first_publish_year,cover_i,isbn,ratings_average,language, subject&limit=5&page=${page}${sort}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
