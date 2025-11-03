import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const contactItems = [
  {
    icon: MapPin,
    title: "Local",
    value: `${CONTACT.ADDRESS.street} – ${CONTACT.ADDRESS.neighborhood}`,
    link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.ADDRESS.full)}`,
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: CONTACT.PHONE_DISPLAY,
    link: CONTACT.WHATSAPP_URL,
  },
  {
    icon: Mail,
    title: "E-mail",
    value: CONTACT.EMAIL,
    link: `mailto:${CONTACT.EMAIL}`,
  },
  {
    icon: Clock,
    title: "Horário",
    value: CONTACT.HORARIO.weekdays,
    link: null,
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@dra.brunadurelli",
    link: "https://www.instagram.com/dra.brunadurelli",
  },
];

const ContactInfoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Localização e Contato
            </h2>
            <p className="text-lg text-muted-foreground">
              Estamos prontos para te atender
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {item.title}
                      </p>
                      <p className="text-base font-semibold text-foreground break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );

              if (item.link) {
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:scale-105 transition-transform"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={index} className="block">
                  {content}
                </div>
              );
            })}
          </div>

          {/* Optional: Google Maps Embed */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-elegant">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2066779768746!2d-46.66166892374564!3d-23.561753778785836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7dbf9ff57%3A0x4ca8eb5c4f7ecca9!2sAv.%20Brasil%2C%20173%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001431-000!5e0!3m2!1spt-BR!2sbr!4v1704906000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Localização da Clínica Dra. Bruna Durelli"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
