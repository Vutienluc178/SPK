---
layout: default
title: "Thẻ (Tags)"
permalink: /tags/
---
<h1 class="h2">Thẻ (Tags)</h1>
{% assign tags = site.tags | sort %}
<ul class="list-unstyled">
  {% for tag in tags %}
    <li class="mb-3">
      <h2 id="{{ tag[0] }}" class="h6 text-uppercase">{{ tag[0] }}</h2>
      <ul>
        {% for post in tag[1] %}
          <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <span class="text-muted small">({{ post.date | date: "%d/%m/%Y" }})</span></li>
        {% endfor %}
      </ul>
    </li>
  {% endfor %}
</ul>
