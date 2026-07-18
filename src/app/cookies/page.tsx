import type { Metadata } from "next";

import {
  LegalDocumentPage,
  LegalSection,
} from "@/components/legal-document-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Политика использования cookie",
  description:
    "Информация об обязательных данных, Яндекс Картах и настройке Яндекс Метрики на сайте автошколы «Перекрёсток».",
  alternates: { canonical: "/cookies/" },
};

const operator = siteConfig.legal.operator;

export default function CookiesPage() {
  return (
    <LegalDocumentPage
      description="Здесь описано, какие технические данные использует сайт, для чего они нужны и как изменить свой выбор."
      title="Политика использования cookie"
    >
      <LegalSection title="1. Что хранит сайт">
        <p>
          Cookie и локальное хранилище браузера — небольшие записи, которые
          помогают сайту запомнить выбор посетителя. Сам сайт сохраняет только
          выбранный режим: разрешена ли аналитика или оставлены только
          необходимые функции.
        </p>
        <p>
          Выбор хранится в браузере под техническим ключом
          <strong> perekrestok-cookie-consent-v1</strong>. В этой записи нет
          имени, телефона или текста отправленных форм.
        </p>
      </LegalSection>

      <LegalSection title="2. Необходимые данные">
        <p>
          Необходимая запись нужна, чтобы баннер не появлялся при каждом
          открытии страницы и чтобы сайт помнил отказ от аналитики. Отключить
          такую запись через интерфейс сайта нельзя, но её можно удалить в
          настройках браузера.
        </p>
      </LegalSection>

      <LegalSection title="3. Яндекс Карты">
        <p>
          В разделе контактов встроена интерактивная карта сервиса Яндекс
          Карты. При загрузке карты браузер обращается к сервисам Яндекса,
          которые могут получить технические сведения, включая IP-адрес,
          данные устройства и браузера. Условия обработки определяет Яндекс.
        </p>
      </LegalSection>

      <LegalSection title="4. Яндекс Метрика">
        <p>
          Яндекс Метрика является необязательной аналитикой и загружается
          только после согласия посетителя. Если выбраны только необходимые
          данные, код Метрики не подключается. Вебвизор и запись содержимого
          форм в текущей настройке отключены.
        </p>
        <p>
          Идентификатор счётчика добавляется владельцем сайта перед запуском.
          Пока он не указан, Метрика не работает даже при согласии.
        </p>
      </LegalSection>

      <LegalSection title="5. Как изменить выбор">
        <p>
          Открыть окно выбора повторно можно кнопкой «Настройки cookie» в
          подвале сайта. Также можно удалить сохранённые данные сайта в
          настройках браузера — после этого баннер появится снова.
        </p>
      </LegalSection>

      <LegalSection title="6. Контакты оператора">
        <p>
          Оператор: {operator.fullName}, ИНН {operator.inn}, ОГРН {operator.ogrn}.
          Вопросы об обработке данных можно направить на {" "}
          <a
            className="underline underline-offset-2 outline-none hover:text-neutral-950 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-yellow-400"
            href={operator.emailHref}
          >
            {operator.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocumentPage>
  );
}
