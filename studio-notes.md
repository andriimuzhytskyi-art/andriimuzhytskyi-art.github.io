---
layout: default
title: Studio Notes
---

<h1>Studio Notes</h1>
<p>Stories about process, progress, ongoing projects, and purpose.</p>

<div class="notes-container">
  {% for post in site.studio-notes reversed %}
    <div class="notes-column">
      <img class="notes-image" src="{{ post.image }}" alt="{{ post.title }}">
      <div class="notes-text">
        <h3 class="notes-title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </h3>
        <div class="notes-date">{{ post.date | date: "%B %-d, %Y" }}</div>
      </div>
    </div>
  {% endfor %}
</div>
