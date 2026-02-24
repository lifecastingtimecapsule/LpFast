import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Utensils, User, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import type { Location, MenuItem, CreateReservationBody } from '../types/reservation';
import {
  fetchLocations,
  fetchMenuItems,
  fetchReservationSettings,
  createReservation,
} from '../lib/reservationApi';
import logoImage from '../assets/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png';

const STEPS = [
  { id: 1, title: '店舗選択', icon: MapPin },
  { id: 2, title: '日付・時間・メニュー', icon: Utensils },
  { id: 3, title: 'お客様情報', icon: User },
  { id: 4, title: '確認・送信', icon: CheckCircle },
];

const TIME_OPTIONS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const initialForm = {
  parent_name: '',
  parent_name_kana: '',
  child_name: '',
  child_name_kana: '',
  phone: '',
  email: '',
  address_text: '',
  notes_internal: '',
};

function getLocationName(loc: Location): string {
  return loc.location_name ?? loc.name ?? '店舗';
}

export function Reservation() {
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    let cancelled = false;
    setConfigError(null);
    setApiError(null);
    (async () => {
      try {
        const [list] = await Promise.all([
          fetchLocations(),
          fetchReservationSettings().catch(() => ({})),
        ]);
        if (!cancelled) setLocations(list);
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : '会場一覧の取得に失敗しました';
        if (msg.includes('VITE_SUPABASE') || msg.includes('設定')) {
          setConfigError(msg);
        } else {
          setApiError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!selectedLocation?.location_id) {
      setMenuItems([]);
      return;
    }
    let cancelled = false;
    setMenuItems([]);
    fetchMenuItems(selectedLocation.location_id).then((list) => {
      if (!cancelled) setMenuItems(list);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [selectedLocation?.location_id]);

  const handleNext = () => {
    setApiError(null);
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    setApiError(null);
    if (step > 1) setStep(step - 1);
  };

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => !!selectedLocation;
  const validateStep2 = () => !!(selectedDate && selectedTime && selectedMenuItem);
  const validateStep3 = () => {
    if (!form.parent_name.trim()) return false;
    if (!form.phone.trim()) return false;
    const phone = form.phone.replace(/\s/g, '');
    if (!/^[0-9\-+]+$/.test(phone) || phone.length < 10) return false;
    return true;
  };

  const canProceed =
    (step === 1 && validateStep1()) ||
    (step === 2 && validateStep2()) ||
    (step === 3 && validateStep3()) ||
    step === 4;

  const validationMessage = () => {
    if (step === 1 && !selectedLocation) return '店舗を選択してください。';
    if (step === 2) {
      if (!selectedDate) return '日付を選択してください。';
      if (!selectedTime) return '時間を選択してください。';
      if (!selectedMenuItem) return 'メニューを選択してください。';
    }
    if (step === 3) {
      if (!form.parent_name.trim()) return '保護者氏名は必須です。';
      if (!form.phone.trim()) return '電話番号は必須です。';
      if (form.phone.trim()) {
        const phone = form.phone.replace(/\s/g, '');
        if (!/^[0-9\-+]+$/.test(phone) || phone.length < 10) {
          return '電話番号の形式が正しくありません。';
        }
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!selectedLocation || !selectedDate || !selectedTime || !selectedMenuItem) return;
    setApiError(null);
    setSubmitLoading(true);
    try {
      const body: CreateReservationBody = {
        reservation_date: selectedDate,
        reservation_time: selectedTime,
        location_id: selectedLocation.location_id,
        menu_item_id: selectedMenuItem.menu_item_id,
        duration_minutes: selectedMenuItem.duration_minutes,
        parent_name: form.parent_name.trim(),
        parent_name_kana: form.parent_name_kana.trim() || undefined,
        child_name: form.child_name.trim() || undefined,
        child_name_kana: form.child_name_kana.trim() || undefined,
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        address_text: form.address_text.trim() || undefined,
        notes_internal: form.notes_internal.trim() || undefined,
      };
      await createReservation(body);
      setSuccess(true);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : '予約の送信に失敗しました。しばらくしてからお試しください。');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (configError) {
    return (
      <>
        <Helmet>
          <title>ご予約｜amorétto</title>
        </Helmet>
        <section className="pt-32 pb-24 px-6 bg-[#FAFAF8] min-h-screen">
          <div className="max-w-xl mx-auto text-center">
            <img src={logoImage} alt="amorétto" className="h-10 w-auto mx-auto mb-6 mix-blend-multiply" />
            <h1 className="font-en-serif text-2xl text-[#2C2C2C] mb-4">ご予約</h1>
            <p className="text-[#666666] mb-6">{configError}</p>
            <p className="text-sm text-[#666666]">設定後、ページを再読み込みしてください。</p>
            <Link to="/" className="inline-block mt-6 text-[#C4A962] hover:underline">ホームへ戻る</Link>
          </div>
        </section>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Helmet>
          <title>予約完了｜amorétto</title>
        </Helmet>
        <section className="pt-32 pb-24 px-6 bg-[#FAFAF8] min-h-screen">
          <div className="max-w-xl mx-auto text-center">
            <img src={logoImage} alt="amorétto" className="h-10 w-auto mx-auto mb-6 mix-blend-multiply" />
            <div className="bg-white border border-[#E5E0D8] rounded-lg p-8 shadow-sm">
              <CheckCircle className="w-14 h-14 text-[#C4A962] mx-auto mb-4" />
              <h1 className="font-en-serif text-2xl text-[#2C2C2C] mb-2">予約を受け付けました</h1>
              <p className="text-[#666666] mb-6">
                ご予約ありがとうございます。内容を確認のうえ、ご連絡させていただきます。
              </p>
              <Link to="/">
                <Button className="bg-[#C4A962] hover:bg-[#B39852] text-white">ホームへ戻る</Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>ご予約｜amorétto 立体手形スタジオ</title>
        <meta name="description" content="amoréttoの立体手形・足形アートのご予約はこちら。豊川店・浜松店から店舗と日時をお選びください。" />
      </Helmet>
      <section className="pt-28 md:pt-36 pb-24 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <img src={logoImage} alt="amorétto" className="h-8 md:h-10 w-auto mx-auto mb-4 mix-blend-multiply" />
            <h1 className="font-en-serif text-2xl md:text-3xl text-[#2C2C2C] italic tracking-wide">ご予約</h1>
            <p className="text-sm text-[#666666] mt-2">店舗・日時・メニューとお客様情報をご入力ください</p>
          </div>

          {/* ステップ表示 */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-1 text-xs md:text-sm ${step >= s.id ? 'text-[#C4A962] font-medium' : 'text-[#999999]'}`}
              >
                <span className="flex items-center gap-1">
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </span>
                {s.id < 4 && <ChevronRight className="w-4 h-4 opacity-60" />}
              </div>
            ))}
          </div>

          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              {apiError}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <Card className="border-[#E5E0D8] bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2C2C2C]">店舗を選択</CardTitle>
                    <CardDescription>ご来店いただく店舗をお選びください</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-[#666666] text-sm">読み込み中…</p>
                    ) : locations.length === 0 ? (
                      <p className="text-[#666666] text-sm">現在、選択できる店舗はありません。</p>
                    ) : (
                      <div className="grid gap-3">
                        {locations.map((loc) => (
                          <button
                            key={loc.location_id}
                            type="button"
                            onClick={() => setSelectedLocation(loc)}
                            className={`text-left p-4 rounded-lg border-2 transition-all ${
                              selectedLocation?.location_id === loc.location_id
                                ? 'border-[#C4A962] bg-[#C4A962]/5'
                                : 'border-[#E5E0D8] hover:border-[#C4A962]/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-[#2C2C2C] font-medium">
                              <MapPin className="w-4 h-4 text-[#C4A962]" />
                              {getLocationName(loc)}
                            </div>
                            {loc.address_text && (
                              <p className="text-xs text-[#666666] mt-1">{loc.address_text}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <Card className="border-[#E5E0D8] bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2C2C2C]">日付・時間・メニュー</CardTitle>
                    <CardDescription>
                      {selectedLocation && getLocationName(selectedLocation)}でご希望の日時とメニューを選んでください
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-[#2C2C2C]">日付（必須）</Label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 border-[#E5E0D8]"
                        min={new Date().toISOString().slice(0, 10)}
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">時間（必須）</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="mt-1 border-[#E5E0D8]">
                          <SelectValue placeholder="時間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">メニュー（必須）</Label>
                      <Select
                        value={selectedMenuItem?.menu_item_id ?? ''}
                        onValueChange={(id) => {
                          const item = menuItems.find((m) => m.menu_item_id === id);
                          setSelectedMenuItem(item ?? null);
                        }}
                      >
                        <SelectTrigger className="mt-1 border-[#E5E0D8]">
                          <SelectValue placeholder="メニューを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {menuItems.map((m) => (
                            <SelectItem key={m.menu_item_id} value={m.menu_item_id}>
                              {m.name}
                              {m.base_price != null ? `（¥${m.base_price.toLocaleString()}）` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {menuItems.length === 0 && selectedLocation && (
                        <p className="text-xs text-[#666666] mt-1">メニューを読み込み中です</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <Card className="border-[#E5E0D8] bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2C2C2C]">お客様情報</CardTitle>
                    <CardDescription>ご連絡先など、必須項目をご入力ください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-[#2C2C2C]">保護者氏名（必須）</Label>
                      <Input
                        value={form.parent_name}
                        onChange={(e) => updateForm('parent_name', e.target.value)}
                        placeholder="山田 太郎"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">保護者氏名（かな）</Label>
                      <Input
                        value={form.parent_name_kana}
                        onChange={(e) => updateForm('parent_name_kana', e.target.value)}
                        placeholder="やまだ たろう"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">お子様名</Label>
                      <Input
                        value={form.child_name}
                        onChange={(e) => updateForm('child_name', e.target.value)}
                        placeholder="山田 花子"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">お子様名（かな）</Label>
                      <Input
                        value={form.child_name_kana}
                        onChange={(e) => updateForm('child_name_kana', e.target.value)}
                        placeholder="やまだ はなこ"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">電話番号（必須）</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        placeholder="090-1234-5678"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">メールアドレス</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="example@email.com"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">住所</Label>
                      <Input
                        value={form.address_text}
                        onChange={(e) => updateForm('address_text', e.target.value)}
                        placeholder="ご住所"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#2C2C2C]">備考</Label>
                      <Input
                        value={form.notes_internal}
                        onChange={(e) => updateForm('notes_internal', e.target.value)}
                        placeholder="ご要望・お問い合わせなど"
                        className="mt-1 border-[#E5E0D8]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <Card className="border-[#E5E0D8] bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2C2C2C]">ご予約内容の確認</CardTitle>
                    <CardDescription>内容に問題なければ「予約を送信する」を押してください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">店舗</span>
                      <span className="text-[#2C2C2C]">{selectedLocation && getLocationName(selectedLocation)}</span>
                    </div>
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">日付</span>
                      <span className="text-[#2C2C2C]">
                        {selectedDate && new Date(selectedDate + 'T12:00:00').toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">時間</span>
                      <span className="text-[#2C2C2C]">{selectedTime}</span>
                    </div>
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">メニュー</span>
                      <span className="text-[#2C2C2C]">{selectedMenuItem?.name}</span>
                    </div>
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">保護者氏名</span>
                      <span className="text-[#2C2C2C]">{form.parent_name}</span>
                    </div>
                    <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                      <span className="text-[#666666]">電話番号</span>
                      <span className="text-[#2C2C2C]">{form.phone}</span>
                    </div>
                    {form.email && (
                      <div className="grid gap-2 py-2 border-b border-[#E5E0D8]">
                        <span className="text-[#666666]">メール</span>
                        <span className="text-[#2C2C2C]">{form.email}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-[#E5E0D8] text-[#2C2C2C]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              戻る
            </Button>
            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-[#C4A962] hover:bg-[#B39852] text-white"
              >
                次へ
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={submitLoading}
                className="bg-[#C4A962] hover:bg-[#B39852] text-white"
              >
                {submitLoading ? '送信中…' : '予約を送信する'}
              </Button>
            )}
          </div>

          {validationMessage() && step < 4 && (
            <p className="text-sm text-amber-700 mt-2 text-center">{validationMessage()}</p>
          )}
        </div>
      </section>
    </>
  );
}
