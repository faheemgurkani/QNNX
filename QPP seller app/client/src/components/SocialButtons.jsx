export default function SocialButtons({ onApple, onFacebook, onGoogle }){
  return (
    <div className="grid gap-3">
      <button type="button" onClick={onGoogle} className="btn-outline flex items-center justify-center gap-2">
        <span className="i">🔎</span><span>Sign up with Google</span>
      </button>
      <button type="button" onClick={onApple} className="btn-outline flex items-center justify-center gap-2">
        <span className="i"></span><span>Sign up with Apple</span>
      </button>
      <button type="button" onClick={onFacebook} className="btn-outline flex items-center justify-center gap-2">
        <span className="i">📘</span><span>Sign up with Facebook</span>
      </button>
    </div>
  )
}
