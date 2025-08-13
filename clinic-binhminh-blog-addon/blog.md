---
layout: default
title: "Blog Sản Phụ khoa"
permalink: /blog/
---
<div class="row g-4">
  <header class="col-12">
    <h1 class="h1">Blog Sản Phụ khoa</h1>
    <p class="text-muted">Kiến thức chính xác, dễ hiểu, cập nhật bởi đội ngũ Bình Minh.</p>
  </header>

  {% for post in site.posts %}
  <div class="col-12 col-md-6">
    <a class="card h-100 text-decoration-none text-dark" href="{{ post.url | relative_url }}">
      <div class="card-body">
        <h2 class="h5">{{ post.title }}</h2>
        <p class="mb-2 small text-muted">{{ post.date | date: "%d/%m/%Y" }} • {{ post.author }}</p>
        <p class="mb-0">{{ post.excerpt | strip_html | truncate: 140 }}</p>
      </div>
    </a>
  </div>
  {% endfor %}
</div>
