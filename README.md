Tuyệt, em viết cho thầy một “sổ tay dựng web trên GitHub Pages + blog Jekyll” từ A→Z. Làm theo là ra site mới bất cứ lúc nào.

---

# 0) Hiểu nhanh: 2 kiểu GitHub Pages

* **User/Org Pages** (ít dùng): repo phải tên `USERNAME.github.io` → URL = `https://USERNAME.github.io/`
* **Project Pages** (phổ biến): repo tên bất kỳ (vd. `SPK`) → URL = `https://USERNAME.github.io/SPK/`

> Ta sẽ mặc định **Project Pages** (dễ xài, mỗi dự án một repo).

---

# 1) Tạo repo & bật Pages

1. Vào GitHub → **New repository**
   Đặt tên (vd. `SPK`) → **Public** → Create.
2. Repo → **Settings → Pages**

   * **Source**: *Deploy from a branch*
   * **Branch**: `main`
   * **Folder**: `/ (root)` → **Save**.
     (Nếu muốn publish từ `docs/`, chọn `/docs` và bỏ toàn bộ file vào thư mục `docs/`.)

---

# 2) Cấu trúc thư mục “chuẩn Pages + Blog”

Đặt ở **root repo** (cùng cấp `index.html`):

```
/ (root)
├── index.html
├── _config.yml
├── _layouts/
│   ├── default.html
│   └── post.html
├── _posts/
│   └── YYYY-MM-DD-ten-bai.md
├── blog.md
├── tags.md
├── assets/
│   ├── css/blog.css
│   └── img/ (ảnh)
├── robots.txt
└── sitemap.xml
```

> Không để các thứ này trong một **folder con** (Jekyll không build đến).

---

# 3) Upload đúng cách (đỡ lỗi)

* **Cách nhanh trên web**: “**Add file → Upload files**” → **kéo thả** *nội dung bên trong* thư mục mẫu (không kéo nguyên folder cha).
* **Di chuyển file**: mở file → bấm ✏️ → đổi **đường dẫn trong tên** (vd. `default.html` → `_layouts/default.html`) → Commit.

---

# 4) Cấu hình Jekyll cho **Project Pages**

Mở `_config.yml` và điền:

```yml
title: "Tên website"
description: "Mô tả ngắn"
url: "https://USERNAME.github.io"   # KHÔNG có /REPO
baseurl: "/REPO"                    # CÓ /REPO, ví dụ: /SPK

theme: null
markdown: kramdown
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

author:
  name: "Tên tác giả/bác sĩ"
  email: ""
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      image: "/assets/img/og-cover.jpg"
      lang: "vi"
```

> **User Pages** thì `baseurl: ""`.

---

# 5) Trang chủ `index.html` (link nội bộ không bị 404)

Nếu dùng Liquid (khuyên dùng): thêm front-matter rỗng ở **2 dòng đầu**:

```html
---
---
<!DOCTYPE html>
<html lang="vi">
  ...
  <a class="nav-link" href="{{ '/blog/' | relative_url }}">Blog</a>
  <a class="nav-link" href="{{ '/tags/' | relative_url }}">Tags</a>
  <a class="nav-link" href="{{ '/privacy.html' | relative_url }}">Chính sách</a>
  <a class="nav-link" href="{{ '/sitemap.xml' | relative_url }}">Sitemap</a>
```

> Nếu **không** dùng Liquid, viết link **tương đối**: `href="blog/"` (đừng ghi `/blog/` vì sẽ nhảy lên gốc domain).

---

# 6) Layouts (bắt buộc cho blog)

**`_layouts/default.html`** (khung trang chung) – đoạn quan trọng:

```html
<link rel="stylesheet" href="{{ '/assets/css/blog.css' | relative_url }}">
{% seo %}  <!-- jekyll-seo-tag -->
{{ content }}
```

**`_layouts/post.html`** (khung bài viết) – có JSON-LD `Article` và `{{ content }}`.

---

# 7) Tạo trang mục lục & tags

**`blog.md`**

```markdown
---
layout: default
title: "Blog Sản Phụ khoa"
permalink: /blog/
---
<!-- vòng lặp site.posts để liệt kê bài -->
```

**`tags.md`**

```markdown
---
layout: default
title: "Thẻ (Tags)"
permalink: /tags/
---
<!-- liệt kê site.tags -->
```

---

# 8) Viết bài mới

File trong `_posts/` **phải** theo chuẩn:

```
YYYY-MM-DD-ten-bai.md
```

Nội dung (front-matter + Markdown):

```markdown
---
title: "9 dấu hiệu nên đi khám phụ khoa sớm"
tags: [phu-khoa, trieu-chung]
excerpt: "Mô tả ngắn 1–2 câu (làm meta description)."
image: "/assets/img/og-cover.jpg"
---
**Tóm tắt:** ...
```

---

# 9) Tối ưu SEO căn bản

* **`jekyll-seo-tag`**: tự tạo OG/Twitter meta.
* **`sitemap.xml`** + **`robots.txt`** (đường dẫn sitemap):

  ```
  User-agent: *
  Allow: /
  Sitemap: https://USERNAME.github.io/REPO/sitemap.xml
  ```
* **OG ảnh**: để một ảnh `/assets/img/og-cover.jpg` (kích thước 1200×630).
* **Tốc độ**: dùng ảnh WebP/PNG nhẹ, `loading="lazy"` cho `<img>`.
* **Canonical**: `jekyll-seo-tag` lo; nếu tự thêm nhớ dùng `{{ page.url | absolute_url }}`.

---

# 10) Biểu mẫu đặt lịch (site tĩnh)

* Dùng **Google Forms**: nút bấm “Mở Google Form” (target `_blank`).
* Hoặc **Formspree**: gửi form qua endpoint (không cần backend).

---

# 11) Bật/kiểm tra build

* **Settings → Pages** đúng như mục 1.
* Tab **Actions**: job **Pages build and deployment** phải “**Succeeded**”.
* URL mở đúng cho Project Pages:

  * Trang chủ: `https://USERNAME.github.io/REPO/`
  * Blog: `https://USERNAME.github.io/REPO/blog/`

---

# 12) Debug nhanh (khi “không lên”)

* Tạo `test.md` ở root:

  ```markdown
  ---
  title: "Jekyll test"
  layout: default
  permalink: /test/
  ---
  Nếu thấy trang này hiển thị thì Jekyll OK.
  ```

  → Mở `https://USERNAME.github.io/REPO/test/`
* Xóa file `.nojekyll` (nếu lỡ có).
* Kiểm tra `_posts/` có file đúng **định dạng tên** và có `---` front-matter.
* **Không** đặt blog trong thư mục con (vd. `blog-addon/`).
* Kiểm tra `baseurl` đúng (sai là link `/blog/` sẽ văng ra gốc domain).

---

# 13) Template “mẫu nào cũng xài được” (gợi ý copy)

* **\_config.yml** cho Project Pages (điều chỉnh URL/REPO/tên):

```yml
title: "Tên website"
description: "Mô tả ngắn"
url: "https://USERNAME.github.io"
baseurl: "/REPO"
theme: null
markdown: kramdown
plugins: [jekyll-seo-tag, jekyll-sitemap, jekyll-feed]
```

* **Link chuẩn trong HTML**:

```html
<a href="{{ '/blog/' | relative_url }}">Blog</a>
```

* **Cấu trúc thư mục**: như mục #2.

---

# 14) Nâng cao (tùy chọn)

* **Custom domain**: Settings → Pages → Custom domain → thêm CNAME; trỏ DNS (A/CNAME) → nhớ cập nhật `url:` trong `_config.yml`.
* **Publish từ `/docs`**: chuyển toàn bộ file vào thư mục `docs/` → Settings → Pages chọn `/docs`.
* **Analytics**: thêm GA4 `<script>` vào `default.html`.
* **404 page**: tạo `404.html` ở root để thân thiện hơn.

---

## Mini-checklist trước khi publish (chỉ 6 tick)

* [ ] `index.html` ở root, có link `{{ '/blog/' | relative_url }}`
* [ ] `_config.yml` đúng `url` + `baseurl`
* [ ] `_layouts/default.html` + `_layouts/post.html`
* [ ] `assets/css/blog.css` đúng đường dẫn
* [ ] `_posts/` có **ít nhất 1 bài** hợp lệ
* [ ] Settings → Pages đúng branch + folder; Actions “Succeeded”

---

Cần một **bộ starter trắng** (trang chủ tối giản + blog đã nối link) để thầy clone làm mẫu mới? Nói em, em gói sẵn `.zip` base template “cắm là chạy”, có luôn nav + blog + SEO.
