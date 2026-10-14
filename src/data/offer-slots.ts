// Настройки счётчика «свободно N из 20 слотов» (/offer/4).
// Счётчик расчётный и зависит только от текущего времени: в один момент все видят одно число,
// внутри недели оно только уменьшается и не опускается ниже minFree. С понедельника — снова limit.

export interface OfferSlotsConfig {
  /** Слотов в неделю: столько свободно в понедельник 00:00 */
  limit: number;
  /** Ниже этого числа счётчик не опускается — записаться можно всегда */
  minFree: number;
  /** Насколько конец недели плавает: к воскресенью остаётся от minFree до minFree + spread */
  spread: number;
  /** Часовой пояс недели и выбора дня */
  timeZone: string;
}

export const offerSlots: OfferSlotsConfig = {
  limit: 20,
  minFree: 3,
  spread: 4,
  timeZone: 'Asia/Tomsk',
};
