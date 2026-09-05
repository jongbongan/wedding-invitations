(() => {
  "use strict";

  const data = window.WEDDING_DATA;
  if (!data) {
    throw new Error("wedding-data.js를 불러오지 못했습니다.");
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const pad = (value, size = 2) => String(value).padStart(size, "0");

  const eventDate = new Date(data.weddingDate);
  if (Number.isNaN(eventDate.getTime())) {
    throw new Error("weddingDate 형식이 올바르지 않습니다.");
  }

  const getKoreanParts = (date) => {
    const parts = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).formatToParts(date);
    return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  };

  const dateParts = getKoreanParts(eventDate);
  const year = Number(dateParts.year);
  const month = Number(dateParts.month);
  const day = Number(dateParts.day);
  const hourText = `${dateParts.dayPeriod} ${dateParts.hour}시${dateParts.minute === "00" ? "" : ` ${dateParts.minute}분`}`;

  const view = {
    ...data,
    date: {
      korean: `${year}년 ${month}월 ${day}일 ${dateParts.weekday} ${hourText}`,
      shortEnglish: eventDate.toLocaleDateString("en-US", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    venue: {
      ...data.venue,
      fullName: [data.venue.name, data.venue.hall].filter(Boolean).join(" · "),
    },
  };

  const getPath = (object, path) =>
    path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), object);

  const setDocumentMeta = () => {
    document.title = data.page.title;
    const description = $("meta[name='description']");
    const ogTitle = $("meta[property='og:title']");
    const ogDescription = $("meta[property='og:description']");
    if (description) description.content = data.page.description;
    if (ogTitle) ogTitle.content = data.page.title;
    if (ogDescription) ogDescription.content = data.page.description;
  };

  const renderText = () => {
    $$('[data-text]').forEach((element) => {
      const value = getPath(view, element.dataset.text);
      if (value === undefined) return;
      element.textContent = value;
      if (element.classList.contains("invitation-copy")) {
        element.innerHTML = "";
        String(value)
          .split("\n")
          .forEach((line, index, lines) => {
            element.append(document.createTextNode(line));
            if (index < lines.length - 1) element.append(document.createElement("br"));
          });
      }
    });

    const cover = $('[data-image="cover"]');
    cover.src = data.images.cover.src;
    cover.alt = data.images.cover.alt;

    const mapImage = data.images.map;
    if (mapImage && mapImage.src) {
      const map = $('[data-image="map"]');
      map.src = mapImage.src;
      map.alt = mapImage.alt || "예식장 약도";
      $("[data-venue-map]").hidden = false;
    }

    $$('[data-link]').forEach((link) => {
      const url = data.venue.links[link.dataset.link];
      if (url) link.href = url;
    });
  };

  const renderCalendar = () => {
    $("[data-calendar-year]").textContent = String(year);
    $("[data-calendar-month]").textContent = pad(month);

    const container = $("[data-calendar-days]");
    const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < firstWeekday; index += 1) {
      const blank = document.createElement("span");
      blank.className = "calendar-blank";
      blank.setAttribute("aria-hidden", "true");
      fragment.append(blank);
    }

    for (let date = 1; date <= lastDay; date += 1) {
      const dateCell = document.createElement(date === day ? "strong" : "span");
      dateCell.textContent = String(date);
      if (date === day) {
        dateCell.className = "wedding-day";
        dateCell.setAttribute("aria-label", `${month}월 ${day}일 예식일`);
      }
      fragment.append(dateCell);
    }

    container.replaceChildren(fragment);
  };

  const renderTravel = () => {
    const container = $("[data-travel-list]");
    const fragment = document.createDocumentFragment();

    data.venue.travel.forEach((item) => {
      const article = document.createElement("article");
      const title = document.createElement("h3");
      const description = document.createElement("div");
      description.className = "travel-lines";
      title.textContent = item.title;
      const lines = Array.isArray(item.description)
        ? item.description
        : String(item.description).split("\n");
      lines
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = line;
          description.append(paragraph);
        });
      article.append(title, description);
      fragment.append(article);
    });

    container.replaceChildren(fragment);
  };

  const phoneHref = (phone) => phone.replace(/[^0-9+]/g, "");

  const renderContacts = () => {
    ["groom", "bride"].forEach((side) => {
      const container = $(`[data-contacts="${side}"]`);
      const fragment = document.createDocumentFragment();

      data.contacts[side].forEach((person) => {
        const row = document.createElement("div");
        row.className = "contact-row";

        const identity = document.createElement("p");
        const relation = document.createElement("span");
        const name = document.createElement("strong");
        relation.textContent = person.relation;
        name.textContent = person.name;
        identity.append(relation, name);

        const actions = document.createElement("div");
        const call = document.createElement("a");
        const message = document.createElement("a");
        call.href = `tel:${phoneHref(person.phone)}`;
        call.textContent = "전화";
        call.setAttribute("aria-label", `${person.relation} ${person.name}에게 전화`);
        message.href = `sms:${phoneHref(person.phone)}`;
        message.textContent = "문자";
        message.setAttribute("aria-label", `${person.relation} ${person.name}에게 문자`);
        actions.append(call, message);

        row.append(identity, actions);
        fragment.append(row);
      });

      container.replaceChildren(fragment);
    });
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  let toastTimer;
  const showToast = (message) => {
    const toast = $("[data-toast]");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const renderAccounts = () => {
    ["groom", "bride"].forEach((side) => {
      const container = $(`[data-accounts="${side}"]`);
      const fragment = document.createDocumentFragment();

      data.accounts[side].forEach((account) => {
        const row = document.createElement("div");
        row.className = "account-row";

        const info = document.createElement("p");
        const owner = document.createElement("strong");
        const number = document.createElement("span");
        owner.textContent = `${account.relation} ${account.name}`;
        number.textContent = `${account.bank} ${account.number}`;
        info.append(owner, number);

        const copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "복사";
        copy.addEventListener("click", async () => {
          try {
            await copyText(`${account.bank} ${account.number}`);
            showToast("계좌번호를 복사했습니다.");
          } catch {
            showToast("복사하지 못했습니다. 다시 시도해 주세요.");
          }
        });

        row.append(info, copy);
        fragment.append(row);
      });

      container.replaceChildren(fragment);
    });
  };

  const renderGallery = () => {
    const container = $("[data-gallery]");
    const fragment = document.createDocumentFragment();

    data.images.gallery.forEach((photo, index) => {
      const button = document.createElement("button");
      const image = document.createElement("img");
      button.type = "button";
      button.className = "gallery-item";
      button.dataset.galleryIndex = String(index);
      button.setAttribute("aria-label", `${photo.alt} 크게 보기`);
      image.src = photo.src;
      image.alt = photo.alt;
      if (photo.position) image.style.objectPosition = photo.position;
      image.loading = index < 2 ? "eager" : "lazy";
      image.decoding = "async";
      button.append(image);
      fragment.append(button);
    });

    container.replaceChildren(fragment);
  };

  let activePhotoIndex = 0;
  const lightbox = $("[data-lightbox]");
  const lightboxImage = $("[data-lightbox-image]");
  const lightboxCaption = $("[data-lightbox-caption]");

  const showPhoto = (index) => {
    const photos = data.images.gallery;
    activePhotoIndex = (index + photos.length) % photos.length;
    const photo = photos[activePhotoIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxCaption.textContent = `${activePhotoIndex + 1} / ${photos.length}`;
  };

  const bindGallery = () => {
    $("[data-gallery]").addEventListener("click", (event) => {
      const button = event.target.closest("[data-gallery-index]");
      if (!button) return;
      showPhoto(Number(button.dataset.galleryIndex));
      lightbox.showModal();
      document.body.classList.add("dialog-open");
    });

    $("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
    $("[data-lightbox-prev]").addEventListener("click", () => showPhoto(activePhotoIndex - 1));
    $("[data-lightbox-next]").addEventListener("click", () => showPhoto(activePhotoIndex + 1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  };

  const updateCountdown = () => {
    const difference = eventDate.getTime() - Date.now();
    const absolute = Math.max(0, difference);
    const days = Math.floor(absolute / 86_400_000);
    const hours = Math.floor((absolute / 3_600_000) % 24);
    const minutes = Math.floor((absolute / 60_000) % 60);
    const seconds = Math.floor((absolute / 1_000) % 60);

    $("[data-count='days']").textContent = pad(days, 3);
    $("[data-count='hours']").textContent = pad(hours);
    $("[data-count='minutes']").textContent = pad(minutes);
    $("[data-count='seconds']").textContent = pad(seconds);

    const copy = $("[data-countdown-copy]");
    if (difference > 0) {
      copy.innerHTML = `두 사람의 결혼식이 <strong>${days}일</strong> 남았습니다.`;
    } else {
      copy.textContent = "함께 축복해 주셔서 감사합니다.";
    }
  };

  const bindShare = () => {
    const shareUrl = data.page.shareUrl || window.location.href;
    $("[data-copy-link]").addEventListener("click", async () => {
      try {
        await copyText(shareUrl);
        showToast("초대장 링크를 복사했습니다.");
      } catch {
        showToast("링크를 복사하지 못했습니다.");
      }
    });

    $("[data-share]").addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: data.page.title,
            text: data.page.description,
            url: shareUrl,
          });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }

      try {
        await copyText(shareUrl);
        showToast("초대장 링크를 복사했습니다.");
      } catch {
        showToast("공유하지 못했습니다. 다시 시도해 주세요.");
      }
    });
  };

  const bindDetails = () => {
    $$('details').forEach((details) => {
      details.addEventListener("toggle", () => {
        const marker = $("summary span", details);
        if (marker) marker.textContent = details.open ? "－" : "＋";
      });
    });
  };

  const observeSections = () => {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    $$(".reveal").forEach((element) => observer.observe(element));
  };

  setDocumentMeta();
  renderText();
  renderCalendar();
  renderTravel();
  renderContacts();
  renderAccounts();
  renderGallery();
  bindGallery();
  bindShare();
  bindDetails();
  observeSections();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
