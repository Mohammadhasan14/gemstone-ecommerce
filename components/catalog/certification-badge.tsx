import { ShieldCheck } from "lucide-react";

type Certification = { labName: string; reportNumber: string; reportUrl: string | null };

export function CertificationBadge({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gold/25 bg-gold/8 px-4 py-3.5">
      {certifications.map((cert) => (
        <div key={cert.reportNumber} className="flex items-start gap-2.5">
          <ShieldCheck size={17} strokeWidth={1.8} className="mt-0.5 shrink-0 text-gold" />
          <div className="text-[12.5px] leading-snug text-ink">
            <span className="font-semibold">{cert.labName} certified</span> · Report #{cert.reportNumber}
            {cert.reportUrl && (
              <>
                {" — "}
                <a href={cert.reportUrl} target="_blank" rel="noopener noreferrer" className="text-teal underline">
                  verify online
                </a>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
