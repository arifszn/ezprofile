import { skeleton } from '../../helpers/utils';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ time, position, company }) => (
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    ></div>
    <div className="my-0.5 text-xs">{time}</div>
    <h3 className="font-semibold">{position}</h3>
    <div className="mb-4 font-normal">{company}</div>
  </li>
);

const Experience = ({ experiences, loading }) => {
  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({
            width: 'w-5/12',
            height: 'h-4',
          })}
          position={skeleton({
            width: 'w-6/12',
            height: 'h-4',
            className: 'my-1.5',
          })}
          company={skeleton({ width: 'w-6/12', height: 'h-3' })}
        />
      );
    }

    return array;
  };

  return (
    <>
      {experiences?.length !== 0 && (
        <div className="card shadow-lg compact bg-base-100">
          <div className="card-body">
            <div className="mx-3">
              <h5 className="card-title">
                {loading ? (
                  skeleton({ width: 'w-32', height: 'h-8' })
                ) : (
                  <span className="text-base-content opacity-70">
                    Experience
                  </span>
                )}
              </h5>
            </div>
            <div className="text-base-content text-opacity-60">
              <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
                {loading ? (
                  renderSkeleton()
                ) : (
                  <Fragment>
                    {experiences.map((experience, index) => (
                      <ListItem
                        key={index}
                        time={
                          (experience?.to &&
                            `${experience.from} - ${experience.to}`) ||
                          (experience?.from && `${experience.from}`)
                        }
                        position={experience.position}
                        company={experience.company}
                      />
                    ))}
                  </Fragment>
                )}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ListItem.propTypes = {
  time: PropTypes.node,
  position: PropTypes.node,
  company: PropTypes.node,
};

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Experience;
