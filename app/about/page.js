import React from "react";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      {/* Hero Section */}
      <section className="relative shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About GetMeAChai
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering creators to build sustainable income streams and
              connect with their most dedicated supporters.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-4">
              GetMeAChai is dedicated to revolutionizing how creators monetize
              their work. We believe that talented individuals deserve direct
              support from their audience without intermediaries taking
              excessive cuts.
            </p>
            <p className="text-gray-300 text-lg">
              Whether you're an artist, writer, musician, or content creator,
              GetMeAChai provides the platform to turn your passion into a
              sustainable income.
            </p>
          </div>
          <div className="bg-[#000080] rounded-lg h-64 relative overflow-hidden flex items-center justify-center p-4">
            <div className="flex gap-4 items-center z-10">
              <div className="w-28 h-28 rounded-lg overflow-hidden shadow-lg bg-[#ff9933]">
                <Image
                  src="/man.gif"
                  alt="creator"
                  width={112}
                  height={112}
                  unoptimized={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-28 h-28 rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src="/group.gif"
                  alt="community"
                  width={112}
                  height={112}
                  unoptimized={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-28 h-28 rounded-lg overflow-hidden shadow-lg bg-[#138808]">
                <Image
                  src="/coin.gif"
                  alt="support"
                  width={112}
                  height={112}
                  unoptimized={true}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Choose GetMeAChai?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-400 text-xl font-bold">☕</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Support with Chai
              </h3>
              <p className="text-gray-400">
                Fans support creators by buying them virtual chai - a simple,
                meaningful way to show appreciation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 text-xl font-bold">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fair Payouts
              </h3>
              <p className="text-gray-400">
                Keep more of what you earn with our transparent pricing and fair
                commission structure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-400 text-xl font-bold">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Build Community
              </h3>
              <p className="text-gray-400">
                Create lasting relationships with your supporters and build a
                loyal community around your work.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-pink-400 text-xl font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Analytics
              </h3>
              <p className="text-gray-400">
                Track your growth with detailed analytics and insights about
                your supporters and earnings.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-400 text-xl font-bold">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-gray-400">
                Your data and transactions are protected with industry-leading
                security standards.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 transition bg-gray-900">
              <div className="w-12 h-12 bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-400 text-xl font-bold">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Easy Setup
              </h3>
              <p className="text-gray-400">
                Get started in minutes with our simple onboarding process and
                intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-linear-to-r from-purple-600 to-blue-500 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <p className="text-blue-100">Active Creators</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <p className="text-blue-100">Happy Supporters</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2M+</div>
              <p className="text-blue-100">Funds Distributed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">
              Transparency
            </h3>
            <p className="text-gray-400">
              We believe in open communication. You always know exactly how much
              you're earning and where your money comes from.
            </p>
          </div>
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">
              Creator First
            </h3>
            <p className="text-gray-400">
              Everything we build is designed with creators in mind. Your
              success is our success.
            </p>
          </div>
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
            <p className="text-gray-400">
              We foster a supportive ecosystem where creators and supporters can
              connect meaningfully.
            </p>
          </div>
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">
              Innovation
            </h3>
            <p className="text-gray-400">
              We continuously improve our platform with cutting-edge features to
              help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gray-800 py-16 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already building sustainable
            incomes with GetMeAChai.
          </p>
          <Link href={"/login"}>
            <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 text-center leading-5 transition duration-200">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

export const metadata = {
  title: 'About - GetMeAChai',
  description: 'Learn more about GetMeAChai and our mission to support creators.',
}

