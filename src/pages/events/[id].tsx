import { useRouter } from 'next/router'
import Image from 'next/image'
import EventDetailSidebar from '../../sections/EventDetailSidebar'

import { PriceHistory } from 'container/PriceHistory'

const EventDetail = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <main className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                className="rounded-full"
                src="/event-detail.png"
                width={64}
                height={64}
                alt="Event Name"
              />
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id} Which party will control the U.S. Senate after the 2022
              election?
            </h1>
            <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
              <svg
                className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx={4} cy={4} r={3} />
              </svg>
              US current affairs
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid">
                  <div className="sm:col-span-1 mb-5">
                    {id && <PriceHistory eventId={id.toString()} />}
                  </div>
                </dl>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Expiration Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <time dateTime="2020-08-25">August 25, 2020</time>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Volume
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">$432,159.52</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Liquidty
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">$344,086.82</dd>
                  </div>
                  <div className="sm:col-span-3">
                    <dt className="text-sm font-medium text-gray-500">
                      About this market
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <p>
                        The 2022 United States Senate elections will be held on
                        November 8, 2022, with 34 of the 100 seats in the Senate
                        being contested.
                      </p>
                      <p>
                        This market will resolve to the party which is
                        affiliated with more than half of the voting Senate
                        members after the 2022 Senate elections, or if the Vice
                        President has the same party affiliation, half or more
                        of the voting Senate members. A Senator&apos;s party
                        affiliation is determined by whichever party’s caucus he
                        or she is a member of; namely at the time of the writing
                        of this question, Bernie Sanders and Angus King are
                        considered to be affiliated with the Democratic Party.
                      </p>
                      <p>
                        Determination of which party controls the Senate after
                        the 2022 U.S. Senate elections will be based on a
                        consensus of credible reporting, or if there is
                        ambiguity, final state election authority certification
                        or other final official determination of the 2022
                        election results.
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
        <EventDetailSidebar />
      </div>
    </main>
  )
}

export default EventDetail
